import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TransactionsTable from './TransactionsTable'
import RoundButton from '../../components/RoundButton'
import Moralis from "moralis";
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { signTransferWithAuthorization } from '../../lib'


const SC_ADDRESS = '0x5dc380906c9C291f3e1FfB261Afe5bb47D76bf7f'
const SC_CHAIN = 'mumbai';

const Balances: NextPage = () => {
    const { isAuthenticated, account, provider } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    useEffect( () => {
        console.log("provider",provider)
        console.log(isAuthenticated, account)
        if(isAuthenticated && account){
            createSubscription();
            fetchTokenMetadata();
            fetchTokenBalances();
            fetchTokenTransfers()
        }
    }, [ isAuthenticated, account ])


    const [ walletTo, setWalletTo] = useState('');
    const [ amount, setAmount] = useState('0');
    const [ tokenName, setTokenName] = useState('');
    const [ tokenDecimals , setTokenDecimals ] = useState(6); 
    const [ balance, setBalance] = useState('0');
    const [ transactions, setTransactions ] = useState([ ])

    const createSubscription = async ()=> {
        // create subscriptions
        const address = account.toLowerCase();
        let fromQuery = new Moralis.Query('TransfersMMTSevMumbai');
        fromQuery.equalTo("from", address)
        let toQuery = new Moralis.Query('TransfersMMTSevMumbai');
        toQuery.equalTo("to", address)
        const subscribe = await  Moralis.Query.or(fromQuery, toQuery).subscribe();

        subscribe.on('update', async (object) => {
            console.log('object updated', object);
            let state = 'pending';
            if( object.attributes.confirmed ) {
                state = 'confirmed';
                toast.success(`Your transaction has been confirmed`);
            }else{
                toast.success(`Your transaction is beeing processed`);
            }
            let updateTx =   {
                id: object.id,
                state: state,
                txHash: object.attributes.transaction_hash,
                from: object.attributes.from,
                to: object.attributes.to,
                value: object.attributes.value,
                date: object.attributes.block_timestamp.toDateString() +' ' +object.attributes.block_timestamp.toLocaleTimeString('es-ES')
            }
            console.log('Transaction updated', updateTx);
            console.log("account subs", account);
            let find = false;
            let transactionsFetched = await fetchTokenTransfers()
            transactionsFetched.map( tx => {
                if(tx.id == updateTx.id){
                    tx = updateTx;
                    find = true
                }
                return tx
            });
            if(!find) transactionsFetched.push(updateTx);
            setTransactions(transactionsFetched);
            fetchTokenBalances();
        });
    }
    const handleRefreshClick = (e:any) =>{
        e.preventDefault();
        fetchTokenTransfers();
        toast.success("Refresh Transactions")
    }
    // check inputs, sign and fetch the relay server
    const handleTransferClick = async (e:any) => {
        e.preventDefault();
        let success = true;
        if(amount <= 0) {
            success = false;
            let error = 'Amount must be > 0 ';
            toast.error(error);
        }
        else if (walletTo == undefined){
            let error = 'Wallet incorrect';
            toast.error(error);
        }
        const JSONdata = await signTransferWithAuthorization(account.toLowerCase(), walletTo, parseInt(amount*(10**tokenDecimals)),provider);
        toast.success('Thank you, your transaction will be submmited in a few seconds');

        const endpoint = 'http://localhost:4040/api/transfer_with_authorization'
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        console.log(response)
        const result = await response.json()
        console.log(result)
        if(result.transactionHash){
            fetchTokenTransfers()
            toast.success('Your transaction has been submitted');
        }else{
            toast.error('Somethiing went wrong: ', result);
        }
    }

    const fetchTokenMetadata = async () => {
        //Get metadata for one token. 
        const tokenMetadata = await Web3Api.token.getTokenMetadata({
            chain: SC_CHAIN,//chainId,
            addresses: SC_ADDRESS//  [ SC_ADDRESS ]
        });
        if(tokenMetadata){
            console.log(tokenMetadata[0])
            setTokenName(tokenMetadata[0].name);
            setTokenDecimals(6);//tokenMetadata[0].decimals)
        }
    };
    const fetchTokenBalances = async () => {
        let address = account ? account : '';
        console.log("balances address",address)
        const balances = await Web3Api.account.getTokenBalances({
            chain: SC_CHAIN,//chainId,
            address: address,
            token_addresses: [SC_ADDRESS],
            //from_block: 12219223
        });
        let balance = balances.find(b => b.token_address = SC_ADDRESS );
        if(balance == undefined) {
            setBalance('0')
        }else{
            console.log("fetchTokenBalances",balances[0])
            console.log((10*balance.decimals))
            const decimals = 6;//balance.decimals
            const balanceDec = parseInt(balance.balance) / (10**decimals);
            console.log(balanceDec)
            setBalance(balanceDec.toFixed(3));
        }
    };
    const fetchTokenTransfers = async () => {
        console.log("account",account)
        const address = account.toLowerCase();
        const fromQuery = new Moralis.Query('TransfersMMTSevMumbai');
        fromQuery.equalTo("from", address)
        const toQuery = new Moralis.Query('TransfersMMTSevMumbai');
        toQuery.equalTo("to", address)
        const txs = await  Moralis.Query.or(fromQuery, toQuery).descending('block_timestamp').find();
        const transactions = [ ];
        for(let tx of txs){
            let state = 'pending';
            if( tx.attributes.confirmed ) state = 'confirmed';
            transactions.push(
                {
                    id: tx.id,
                    state: state,
                    txHash: tx.attributes.transaction_hash,
                    from: tx.attributes.from,
                    to: tx.attributes.to,
                    value: tx.attributes.value / 10 ** tokenDecimals,
                    date: tx.attributes.block_timestamp.toDateString() +' ' +tx.attributes.block_timestamp.toLocaleTimeString('es-ES')
                }
            );

        }
        console.log(" fetchTokenTransfers",transactions)
        setTransactions(transactions);
        return transactions;
    };
    return isAuthenticated || account ? (
    <>
        <div className="mt-10 flex flex-row gap-4  ">
        <div className="basis-1/4 overflow-x-auto bg-slate-900 shadow-md sm:rounded-lg ">
            <p className="text-2l mx-5 mt-5 bg-slate-900 text-center font-semibold text-white antialiased">
            Your Coin's balance
            </p>
            <div className="mx-10 mt-3  bg-slate-800  shadow-md sm:rounded-lg">
            <p className="text-center p-2 text-l font-semibold text-white antialiased">
            {balance}
            </p>
            </div>

        </div>
        <div className="basis-3/4 overflow-x-auto bg-slate-900 shadow-md sm:rounded-lg ">
            <div className="text-2l mx-10 mt-5 bg-slate-900 text-left font-semibold text-white antialiased">
            Transfer
            </div>
            <form onSubmit={handleTransferClick}  className="mb-5 flex flex-row gap-4">
                <input
                    value={walletTo}
                    onChange={(e) => setWalletTo(e.target.value)}
                    placeholder="Enter Account"
                    className="mx-10 my-3 basis-2/4 bg-slate-800  p-2 text-slate-400 sm:rounded-lg"/>


                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="mx-5 my-3 basis-1/4 bg-slate-800  p-2 text-slate-400 sm:rounded-lg"
                />
  
                <RoundButton
                    className=" my-3 ml-5 mr-10 basis-1/4 self-center"
                >
                    Send
                </RoundButton>
            </form>
        </div>
        </div>
        <div className="relative  my-8 overflow-x-auto bg-slate-900 px-10 py-10 shadow-md sm:rounded-lg">
            <div className="flex flex-row gap-4 ">
                <h1 className="basis-1/4 text-xl font-semibold text-white antialiased">
                    TRANSACTIONS
                </h1>
                <span className="basis-2/4"></span>
                <button className="basis-1/4" onClick={handleRefreshClick}>
                <svg className= "ml-20 w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>            

                </button>
            </div>
        <TransactionsTable data = { transactions } />
        </div>

    </>
    ): (
        <>        
        <div className="mt-10 overflow-x-auto bg-slate-900 shadow-md sm:rounded-lg ">

        <h1 className="p-5 text-xl font-semibold text-white antialiased">
            Please authenticate to use this page
            </h1>
            </div>
        </>

    )
    }

    export default Balances
