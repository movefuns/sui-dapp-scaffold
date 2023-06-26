import React, {useEffect, useState } from "react";
import { JsonRpcProvider,TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Button, Card, CardActions, CardContent, FormControl, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";


export default function Home() {
const { signAndExecuteTransactionBlock } = useWalletKit();
const [message, setMessage] = useState('');
const [fetchMessage, setFetchMessage] = useState('');
const [link, setLink] = useState('');
const [alertFlag, setAlertFlag] = useState(false);
    const { t } = useTranslation();

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
    console.log(11);
    
}

useEffect(() => {
    (async () => {
        getMsg()
    })()
}, [])

return (
    <div>
        <Card sx={{ width: '100%', height: '100vh', borderRadius: 0 }}>
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-basic"
                        onChange={(v: any) => {
                            setMessage(v.target.value)
                        }}
                    />

                </Stack>
            </CardContent>
            <CardActions>
                <Button variant="contained" fullWidth onClick={setMsg}>{t("trans.set_message")}</Button>
            </CardActions>
            <h5>{t("trans.get_message")}: {fetchMessage}</h5>
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
        </Card>
        
    </div>

  )
}



