
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './components/home/Home'
import SignIn from '././components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import About from './components/about/About'
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile';

function App() {
  const browserrouter = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/signin',
          element:<SignIn/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/author-profile',
          element:<UserProfile/>
        },
        {
          path:'/user-profile',
          element:<AuthorProfile/>
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={browserrouter}/>
    </>
  // State
  // const [postsData, setPostsData] = useState([]);
  // const [usersData, setUsersData] = useState([]);
  // const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  // const usersUrl = 'https://jsonplaceholder.typicode.com/users';

  // useEffect(() => {
  //   console.log("use effect is executed");
  //   fetch(postsUrl) 
  //     .then(res => res.json())
  //     .then(posts => setPostsData(posts))
  //     .catch(err => console.log(err));
  // }, []); // Empty dependency array to run the effect only once after the initial render

  // function getUsersDat(){
  //   console.log("use effect is executed");
  //   fetch(usersUrl) 
  //     .then(res => res.json())
  //     .then(users => {setUsersData(users)})
  //     .catch(err => console.log(err));
  // }
  // console.log("component rendered");

  

      /*{ <h1>Root component</h1>
      <button onClick={getUsersDat}>get users data</button>
      {usersData.length !== 0 && (
          usersData.map((user,index)=>{
            <p key={index}>{user.name}</p>
          })
      )}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {postsData.map(item => (
            <tr key={item.id}> {}
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table> }
    </div>*/
  );
}

export default App;
