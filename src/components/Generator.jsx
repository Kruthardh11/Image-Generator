import React, { useState } from "react";
import { Auth, db, storage, API_TOKEN } from '../FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth"
import {v4} from 'uuid';
import { BsDownload } from "react-icons/bs";
import { CiSaveUp2 } from "react-icons/ci";




const Generator = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth) 
  const postRef = collection(db, "post")

  const uploadImage = async () =>{
    if(imageFile !== null){
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`)
      uploadBytes(imageRef, imageFile)
      .then(()=>{
        getDownloadURL(imageRef)
        .then((url)=>{
          if(prompt !== ""){
            addDoc(postRef, {
              prompt: prompt,
              image: url,
              user: user.displayName,
              logo: user.photoURL,
            })
            .then(res=>alert("posted"))
            .catch(err=>console.log(err))
          }
        })
      })
      .catch(err=>console.log(err))
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    setPrompt(input)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
  <div className=" flex items-center justify-center flex-col">
    <div className="m-5">
        <h1 className="font-extrabold text-[#222328] text-3xl">Prompt Your Creativity!</h1>
        <p className="mt-2 text-[#666e75] text-md max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>
    <form className="mt-2" onSubmit={handleSubmit}>
      <input type="text" className="p-2" name="input" placeholder="type your prompt here..." onChange={(e)=>setPrompt(e.target.value)} />
      <button type="submit" className="bg-blue-600 rounded p-2 mx-4 text-white hover:bg-green-500">Generate</button>
    </form>
    {loading && <div className="my-5"><div class="flex justify-center items-center h-auto">
  <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
</div>
</div>}
    {!loading && output && (
      <div className="m-5 ">
        <img src={output} alt="art" className="border-2 border-gray-600" />
        <div className="m-5 flex  items-center justify-center">
            <button onClick={handleDownload} className="rounded bg-gray-700 p-2" ><BsDownload className="w-[40px] h-[30px] "/></button>
            {user && <button onClick={uploadImage}  className="rounded bg-gray-700 p-2 ml-5"><CiSaveUp2 className="w-[40px] h-[30px]" /></button>}
        </div>
      </div>
    )}

    </div>);
  
};

export default Generator;