import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import DisplayPost from './DisplayPost';
import FormField from "./FormField"

const Home = () => {
  const [allposts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const postRef = collection(db, "post")

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allposts.filter((item) => item.user.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  useEffect(() => {
    setLoading(true)
    const getPosts =  async () => {
      await getDocs(postRef)
        .then(data => {
          setAllPosts(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
          setLoading(false);
        })
    }
    getPosts()
  }, [])
  return (
    <section className="max-w-7xl mx-30px-auto">
      <div className='flex flex-col items-center justify-center m-5 '>
        <h1 className="font-extrabold text-3xl ">The Community Showcase</h1>
        <p className="mt-5s text-gray-500 text-md max-w-[500px] text-center">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      <div className="mt-16 flex items-center justify-center">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            loadinggg
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 p-4">
              {searchText && searchedResults ? (
                searchedResults.map(post=>(
                <DisplayPost
                  post={post}
                />
                ))
              ) : (allposts.map(post=>(
                <DisplayPost
                  post={post}
                />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home

