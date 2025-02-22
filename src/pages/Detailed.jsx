import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AvatarGenerator } from 'random-avatar-generator';
import Accordion from '../components/accordionThread';
// import { Orbis } from '@orbisclub/orbis-sdk';
import productsList from '../mockdata/productsList';
import commentsList from '../mockdata/commentsList';
// import { Election, EnvOptions, VocdoniSDKClient, PlainCensus } from '@vocdoni/sdk';
import { Web3Provider } from '@ethersproject/providers'
// import { connector as metamask, hooks as mhooks } from '../services/connectToMetamask'
// import krebit from "@krebitdao/reputation-passport";


const InitiateVocdoni = (category, productId) => {

  const [provider, setProvider] = useState('');
  const [account, setAccount] = useState('');
  const [signers, setSigners] = useState([]);


  console.log(category);
  console.log(productId);
  console.log(productsList.filter(product => product.category === category));
  
  // const client = new VocdoniSDKClient({
  //     env: EnvOptions.DEV,
  //     // wallet: 0x39c03aC0193B471683Bfa2c2b65e6A2C4C7bF83c // Replace "signer" with your signer object, e.g. Metamask or Walletconnect
  //     // wallet: (mprovider.getSigner())
  //   });

  // (async () => {
  //   const info = await client.createAccount()
  //   console.log(info) // will show account information
  // })();

}

const ProductTable = ({ products, category }) => {

  const currentList = products.filter(product => product.category === category);

  return (
    <div className="overflow-x-auto relative mb-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Product name</th>
            <th scope="col" className="py-3 px-6">Color</th>
            <th scope="col" className="py-3 px-6">Price</th>
            <th scope="col" className="py-3 px-6">Rating</th>
            <th scope="col" className="py-3 px-6">Votes</th>
            <th scope="col" className="py-3 px-6">Cast your vote</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((product) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </th>
              <td className="py-4 px-6">{product.color}</td>
              <td className="py-4 px-6">{product.price}</td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Rating star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{product.rating}</p>
                  </div>
              </td>
              <td className="py-4 px-6">{product.votes}</td>
              <td class="py-4 px-6">
                  <button 
                  type="vote"
                  onClick={() => InitiateVocdoni(category, product.id)} 
                  class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Vote
                  </button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
)}

const Comment = (props) => {
  const generator = new AvatarGenerator();

  return(
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <img className="rounded-full shadow-lg" src={generator.generateRandomAvatar(props.authorName)} alt={props.authorName} />
      </span>
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
        <div className="justify-between items-center mb-3 sm:flex">
          <time className={props.reputed=="true" ? "mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0" : "hidden"}>✅ Highly Reputed Author</time>
          <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
            {props.authorName.substring(0, 3) + "..." + props.authorName.substring(props.authorName.length - 5)} commented on 
            <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline"> {props.linkText}</a>
            </div>
        </div>
        <div className="p-3 text-sm font-normal text-gray-500 rounded-lg border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
          {props.commentText}
        </div>
      </div>
    </li>
  )
}

const Detailed = () => {
  const location = useLocation();
  const pathnameValues = location.pathname.split('/');
  const deviceName = pathnameValues[2].toUpperCase();
  const generator = new AvatarGenerator();

  // let orbis = new Orbis();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(commentsList.filter(comment => comment.category === pathnameValues[2]));
  }, [pathnameValues[2]]);

  

  // const passport = new krebit.core.Passport();
  // passport.read("0x39c03aC0193B471683Bfa2c2b65e6A2C4C7bF83c");
  // console.log(passport);

  const panels = [
    {
      id: 1,
      heading: 'What is Flowbite?',
      body: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
          <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
        </>
      )
    }
    ]

    // const handleSubmit = async event => {
    //     event.preventDefault();
       
    //     // Create the new post
    //     const createPostResponse = await orbis.createPost({body: message, title: subject});
    //     if (createPostResponse.status !== 201) {
    //       // If the post creation is unsuccessful, show an error message
    //       alert('Error creating post');
    //       return;
    //     }
    //     console.log(createPostResponse);
    // }

  return (
  <>
  <section class="text-gray-600 body-font">
      
  <div class="px-10 mx-auto max-w-7xl">
    
    <div class="flex flex-col text-center w-full mb-10">
      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Products</h2>
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">{deviceName}</h1>
    </div>
    
    
    <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-3xl dark:text-white">The <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">fan-favorite</mark> faceoff: which product will you support?</h1>
    <p class="text-lg font-normal text-gray-500 lg:text-sm dark:text-gray-400 mb-8">We're putting the top brands head to head in a competition to see 
    which one is the fan favorite. Whether you're a die-hard fan of one particular product or you're just 
    curious to see how they stack up against each other, this poll is for you. So cast your vote and let 
    your voice be heard - which product will come out on top in the end?</p>
    
    <ProductTable products={productsList} category={pathnameValues[2]}/>

    <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-3xl dark:text-white">The <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">social</mark> forum</h1>

    <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                
        {/* <Accordion panels={panels} /> */}

        <ol class="relative border-l border-gray-200 dark:border-gray-700 mx-8 py-4">                  
        {comments.map((comment) => (
        <Comment
          avatarUrl={comment.avatarUrl}
          authorName={comment.authorName}
          timestamp={comment.timestamp}
          linkText={comment.linkText}
          commentText={comment.commentText}
          key={comment.avatarUrl}
          reputed = {comment.reputed}
        />
        ))}
        </ol>
        
        {/* <li>
          <Link href="#" class="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                <img class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0" src={generator.generateRandomAvatar()} alt=""/>
                <div class="text-gray-600 dark:text-gray-400">
                    <div class="text-base font-normal"><span class="font-medium text-gray-900 dark:text-white">Jese Leos</span> likes <span class="font-medium text-gray-900 dark:text-white">Bonnie Green's</span> post in <span class="font-medium text-gray-900 dark:text-white"> How to start with Flowbite library</span></div>
                    <div class="text-sm font-normal">"I wanted to share a webinar zeroheight."</div>
                    <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        ✅ Highly Reputed Author
                    </span> 
                </div>
            </Link>
        </li> */}
    </ol>

    {/* <div class="flex flex-col items-center">
      <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing <span class="font-bold text-gray-900 dark:text-white">1</span> to <span class="font-bold text-gray-900 dark:text-white">10</span> of <span class="font-bold text-gray-900 dark:text-white">100</span> Entries
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-l hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-gray-400 dark:hover:bg-blue-700 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            Prev
        </button>
        <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 border-0 border-l border-blue-700 rounded-r hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-gray-400 dark:hover:bg-blue-700 dark:hover:text-white">
            Next
            <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>  
    </div> */}


    <form className='px-4'>   
      {/* <label for="search" class="mt-3 text-sm font-medium text-gray-900 sr-only dark:text-white">Create Tread</label>
      <label for="topic" class="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
      <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              ✍️
          </div>
          <input type="search" id="search" value={subject} onChange={event => setSubject(event.target.value)} class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Create Tread" required/>
      </div> */}
      <label for="message" class="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
      <textarea id="message" rows="4" value={message} onChange={event => setMessage(event.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
    </form>

    
  </div>
  </section>
  </>
  );
};

export default Detailed;
