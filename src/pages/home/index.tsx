import React, {useEffect, useState } from "react";
import { JsonRpcProvider,TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


export default function Home() {
const { signAndExecuteTransactionBlock } = useWalletKit();
const [message, setMessage] = useState('');
const [fetchMessage, setFetchMessage] = useState('');
const [link, setLink] = useState('');
const [alertFlag, setAlertFlag] = useState(false);

async function setMsg() {
    setMessage("")
    try {
        const tx = new TransactionBlock();
        tx.moveCall({
        target: `${process.env.REACT_APP_DAPP_PACKAGE}::${process.env.REACT_APP_DAPP_MODULE}::setMessage` as any,
        arguments: [
            tx.pure("0xb4db4a17b1f09a26b3771d8852b4eb6803a8facf1033d68bf51e5de5363fb9c4"),
            tx.pure(message)
        ]
        });

        const resData = await signAndExecuteTransactionBlock({
        transactionBlock: tx
        });

        setTimeout(getMsg,2000);
        await openNotification(`https://suiexplorer.com/txblock/${resData.digest}?network=${process.env.REACT_APP_SUI_NETWORK}`);
    } catch (e) {
        console.error('failed', e);
    }
}

async function getMsg() {
    const provider = new JsonRpcProvider();
    const txn = await provider.getObject({
    id: '0xb4db4a17b1f09a26b3771d8852b4eb6803a8facf1033d68bf51e5de5363fb9c4',
    // fetch the object content field
    options: { showContent: true },
    });
    if(txn.data?.content !== undefined && "fields" in txn.data?.content) {
    setFetchMessage(txn.data?.content.fields.value)
}
}

async function openNotification(msg:string) {
    setLink(msg);
    setAlertFlag(true);
}

useEffect(() => {
    (async () => {
        getMsg()
    })()
}, [])

return (
    <>
        <div>
            <Collapse in={alertFlag}>
                <Alert
                    onClose={() => {setAlertFlag(true)}}
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlertFlag(false);
                        }}
                        >
                <CloseIcon fontSize="inherit" />
                </IconButton>}
                sx={{ mb: 2 }}>
                {link}
                </Alert>
            </Collapse>
        </div>
        <div className="card">      
            <div className="w-full bg-white">
            <label className="text-l sm:text-xl px-4">Set Message:</label>
            <div className="px-4">
                <input
                placeholder="Message"
                className="text-input"
                onChange={e => setMessage(e.target.value)}
                value={message}
                />
            </div>
            <label className="text-xs px-4 text-gray-400">Get Message: {fetchMessage}</label>
            </div>   
            <div className="flex justify-center py-2 px-4">
            <button
                className="btn-neutral"
                onClick={setMsg}
                >
                Set Message
            </button>
            </div>
        </div>
    </>
  )
}



