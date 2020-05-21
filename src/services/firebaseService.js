import firebase from '../config/firebase';

let firebaseService = {
    uploadFile: (fileName, src) => {
        // let urls=[]
        return new Promise((resolve, reject)=>{
            let ref = firebase.storage.ref(`/images/${fileName}`)
            ref.put(src).then(async()=>{
                await ref.getDownloadURL().then(url=>{
                    // urls.push(url)
                    resolve({
                        success: true,
                        msg:'File Upload',
                        url: url
                    })
                })
            }).catch(e=>{
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    }
}

export default firebaseService