import { Header } from './Header'
import { Button } from "@/components/ui/button"
import { z } from 'zod'
import { useState } from 'react'
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createMintToInstruction, createAssociatedTokenAccountInstruction, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';



const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    symbol: z.string().min(1, "Symbol is required").max(10, "Symbol must be less than 10 characters"),
    decimals: z.coerce.number().min(0, "Decimals must be 0 or greater").max(18, "Decimals must be 18 or less"),
    supply: z.coerce.number().min(1, "Supply must be greater than 0"),
    imageurl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type FormData = z.infer<typeof formSchema>

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import { WalletButton } from './WalletButton'
import { toast } from 'sonner'
import Footer from './Footer'
import { HowToUseAndFAQ } from './Accordion'

function TokenLaunchpad() {

    const {connected} = useWallet() ; 
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {connection} = useConnection() ; 
    const wallet = useWallet(); 
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({})

        const formData = new FormData(e.currentTarget)

        const data = {
            name: formData.get('name') as string,
            symbol: formData.get('symbol') as string,
            decimals: formData.get('decimals') as string,
            supply: formData.get('supply') as string,
            imageurl: formData.get('imageurl') as string,
        }

        const result = formSchema.safeParse(data)

        if (result.success) {
            try {
                console.log("Valid data:", result.data)

                const mintKeyPair = Keypair.generate() ; 
                const metadata = {
                    mint : mintKeyPair.publicKey , 
                    name : result.data.name , 
                    symbol : result.data.symbol , 
                    uri :  result.data.imageurl || "", 
                    additionalMetadata :[]
                }

                const mintLen = getMintLen([ExtensionType.MetadataPointer]) ; 
                const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length

                const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen) ; 

                const transaction = new Transaction().add(

                    SystemProgram.createAccount({
                        //@ts-ignore
                        fromPubkey : wallet.publicKey , 
                        newAccountPubkey : mintKeyPair.publicKey , 
                        space : mintLen , 
                        lamports , 
                        programId : TOKEN_2022_PROGRAM_ID ,
                    }) , 


                    createInitializeMetadataPointerInstruction(mintKeyPair.publicKey , wallet.publicKey , mintKeyPair.publicKey , TOKEN_2022_PROGRAM_ID),

                    //@ts-ignore
                    createInitializeMintInstruction(mintKeyPair.publicKey , result.data.decimals , wallet.publicKey , null , TOKEN_2022_PROGRAM_ID),

                    createInitializeInstruction({
                        programId : TOKEN_2022_PROGRAM_ID , 
                        mint : mintKeyPair.publicKey , 
                        metadata : mintKeyPair.publicKey , 
                        name : metadata.name,
                        symbol : metadata.symbol , 
                        uri : metadata.uri , 
                        //@ts-ignore
                        mintAuthority : wallet.publicKey , 
                        //@ts-ignore
                        updateAuthority : wallet.publicKey , 
                    }),
                ); 

                //@ts-ignore
                transaction.feePayer = wallet.publicKey ; 
                transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash ; 
                transaction.partialSign(mintKeyPair) ; 

                await wallet.sendTransaction(transaction , connection);

                toast.success("Mint account created", { description: mintKeyPair.publicKey.toBase58() })

                const associatedToken = getAssociatedTokenAddressSync(
                    mintKeyPair.publicKey , 
                    //@ts-ignore
                    wallet.publicKey , 
                    false , 
                    TOKEN_2022_PROGRAM_ID
                )

                const transaction2 = new Transaction().add(
                    createAssociatedTokenAccountInstruction(
                        //@ts-ignore
                        wallet.publicKey , 
                        associatedToken , 
                        wallet.publicKey , 
                        mintKeyPair.publicKey, 
                        TOKEN_2022_PROGRAM_ID
                    )
                ); 

                await wallet.sendTransaction(transaction2, connection); 

                toast.success("Associated token account created", { description: associatedToken.toBase58() })

                const amount = result.data.supply * 1000000000
                const transaction3 = new Transaction().add(
                    //@ts-ignore
                    createMintToInstruction(mintKeyPair.publicKey , associatedToken , wallet.publicKey , amount, [] , TOKEN_2022_PROGRAM_ID)
                )

                await wallet.sendTransaction(transaction3 , connection)

                toast.success("Tokens minted", { description: `${amount} units sent to ATA` })
            } catch (err: any) {
                toast.error("Transaction failed", { description: err?.message || String(err) })
            }
        } else {
            console.log("Validation errors:", result.error.errors)
            const newErrors: Partial<Record<keyof FormData, string>> = {}
            result.error.errors.forEach((error) => {
                const field = error.path[0] as keyof FormData
                newErrors[field] = error.message
            })
            setErrors(newErrors)
        }
        
        setIsSubmitting(false)
    }

    return (
        <div>
            <Header showNavItems={false} />

            <div className='pt-32 text-5xl font-semibold'>TokenLaunchpad</div>

            <Card className="w-full max-w-sm mx-auto mt-20 mb-10">
                <CardHeader>
                    <CardTitle>Enter the details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name='name'
                                    type="text"
                                    placeholder="My Token"
                                    required
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="symbol">Symbol</Label>
                                <Input
                                    id="symbol"
                                    name='symbol'
                                    type="text"
                                    placeholder="MT"
                                    required
                                    className={errors.symbol ? "border-red-500" : ""}
                                />
                                {errors.symbol && (
                                    <p className="text-sm text-red-500">{errors.symbol}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="decimals">Decimals</Label>
                                <Input
                                    id="decimals"
                                    name='decimals'
                                    type="number"
                                    placeholder="9"
                                    required
                                    min="0"
                                    max="18"
                                    className={errors.decimals ? "border-red-500" : ""}
                                />
                                {errors.decimals && (
                                    <p className="text-sm text-red-500">{errors.decimals}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="supply">Supply</Label>
                                <Input
                                    id="supply"
                                    name='supply'
                                    type="number"
                                    placeholder="100"
                                    required
                                    min="1"
                                    className={errors.supply ? "border-red-500" : ""}
                                />
                                {errors.supply && (
                                    <p className="text-sm text-red-500">{errors.supply}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="imageurl">Image URL (Optional)</Label>
                                <Input
                                    id="imageurl"
                                    name='imageurl'
                                    type="url"
                                    placeholder="https://myimageurl.com"
                                    className={errors.imageurl ? "border-red-500" : ""}
                                />
                                {errors.imageurl && (
                                    <p className="text-sm text-red-500">{errors.imageurl}</p>
                                )}
                            </div>

                            {
                                connected ? (<Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating Token..." : "Create Token"}
                                </Button>) : (<WalletButton/>)
                            }
                            
                            
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2 ">
                    <Button variant="outline" className="w-full hover:bg-foreground">
                        Total fees : 0.3 SOL
                    </Button>
                </CardFooter>
            </Card>

            <HowToUseAndFAQ/>

            <Footer/>
        </div>
    )
}

export default TokenLaunchpad