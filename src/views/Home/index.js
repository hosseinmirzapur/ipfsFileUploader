import {Fragment, useState} from "react";
import CustomButton from "../../components/CustomButton";
import {Button, Label, Progress} from "reactstrap";
import {toast} from "react-toastify";
import axios from "axios";
import DragDrop from "../../components/DragDrop";

const Home = () => {
    // ** Variables
    const [uploadedFile, setUploadedFile] = useState(null)
    const [ipfsHash, setIpfsHash] = useState('')
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    // ** Variable Functions
    const handleSaveToClipboard = async () => {
        await navigator.clipboard.writeText(ipfsHash)
        toast.info('IPFS Hash copied to clipboard.')
    }
    const handleSaveURLToClipboard = async () => {
        await navigator.clipboard.writeText(`https://ipfs.io/ipfs/${ipfsHash}`)
        toast.info('File URL copied to clipboard.')
    }

    // ** Axios Functions
    const handleUploadToIpfs = async () => {
        if (uploadedFile == null) {
            toast.warn('File input cannot be empty')
            return false
        }
        setLoading(true)
        const formData = new FormData()
        formData.append('file', uploadedFile)

        await axios.post('https://api.tatum.io/v3/ipfs', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-api-key": "f7cb0c62-62fc-4daa-8889-e5003b73273b"
            },
            onUploadProgress: progressEvent => setProgress(progressEvent.progress),
            timeout: 1000 * 60 * 60
        })
            .then(async res => {
                await setIpfsHash(res?.data?.ipfsHash)
                await setUploadedFile(null)
                toast.success('Your file has been successfully uploaded to IPFS.')
                await setLoading(false)
                await setProgress(0)
            })
            .catch(async () => {
                toast.error('We couldn\'t send your file to IPFS at the moment, please try again later.')
                await setLoading(false)
                await setProgress(0)
            })
    }


    return (
        <Fragment>
            <div className={'d-flex flex-column gap-2 position-absolute border-primary'}
                 style={{
                     transform: 'translate(-50%,-100%)',
                     left: '50%',
                     width: '100%',
                     top: ipfsHash === '' ? '50%' : '60%'
                 }}
            >
                <div className={'text-center '}>
                    <h3>IPFS Storage</h3>
                </div>
                {ipfsHash !== '' ? <div className={'d-flex flex-column text-center mt-5 gap-3 mb-5'}>
                    <div className={'d-flex flex-row gap-2 justify-content-center'}>
                        <CustomButton
                            text={'Copy IPFS Hash to Clipboard'}
                            color={'primary'}
                            clickEvent={handleSaveToClipboard}
                        />
                    </div>
                    <div className={'d-flex flex-row gap-2 justify-content-center'}>
                        <CustomButton
                            text={'Copy File URL to Clipboard'}
                            color={'primary'}
                            clickEvent={handleSaveURLToClipboard}
                        />
                    </div>
                </div> : null}
                <br/>
                <div className={'d-flex flex-column gap-5'} style={{
                    padding: '0 20%'
                }}>
                    <div className={'d-flex flex-column align-self-center gap-2'}>
                        <DragDrop setFile={setUploadedFile} uploadedFile={uploadedFile}/>
                        {loading ? <Button color={'primary'} onClick={() => window.location.reload()}>
                            Cancel Upload
                        </Button> : null}
                        {loading ? <>
                            <Progress value={Math.ceil(progress * 100)}
                                      color={progress !== 1 ? 'primary' : 'success'} className={'w-auto'}/>
                            <Label>
                                {Math.ceil(progress * 100)} % Uploaded
                            </Label>
                        </> : null}
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <CustomButton
                            text={loading ? 'Uploading...' : 'Save to IPFS'}
                            clickEvent={handleUploadToIpfs}
                            disabled={loading}
                        />
                    </div>
                    {uploadedFile != null ? <div
                        className={'d-flex flex-column gap-2 justify-content-center align-items-center align-self-center'}>
                        <CustomButton
                            text={'Click to remove file'}
                            clickEvent={() => setUploadedFile(null)}
                            color={'danger'}
                        />
                    </div> : null}
                </div>
            </div>
        </Fragment>
    )
}

export default Home;
