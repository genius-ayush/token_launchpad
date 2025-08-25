import { Header } from './Header'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function TokenLaunchpad() {
    return (
        <div>
            <Header />

            <div className='pt-32 text-5xl font-semibold'>TokenLaunchpad</div>

            <Card className="w-full max-w-sm mx-auto mt-20">
                <CardHeader>
                    <CardTitle>Enter the details</CardTitle>
                    
                
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="My Token"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Symbol</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="MT"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Decimals</Label>
                                <Input
                                    id="decimals"
                                    type="number"
                                    placeholder="9"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Supply</Label>
                                <Input
                                    id="supply"
                                    type="number"
                                    placeholder="100"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">ImageURL</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="https://myimageurl.com"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Create Token
                    </Button>
                    <Button variant="outline" className="w-full hover:bg-foreground">
                        Tota fees : 0.3 SOL
                    </Button>
                </CardFooter>
            </Card>
            


        </div>
    )
}

export default TokenLaunchpad