import { createMint } from "@solana/spl-token";
export function TokenLaunchpad() {

    const createToken = ()=>{

        const name  = document.getElementById("name") as HTMLInputElement  ; 
        const symbol = document.getElementById("symbol") as HTMLInputElement  ; 
        const imgURL = document.getElementById("imgURL") as HTMLInputElement  ; 
        const initialSupply = document.getElementById("initialSupply") as HTMLInputElement ;

        // createMint() ; 

        console.log(name?.value) ; 
    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="imgURL" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="initialSupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button  className='btn' onClick={createToken}>Create a token</button>
    </div>
}