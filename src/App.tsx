import { useEffect, useState } from "react";
import UserCard, { UserProps } from "./components/UserCard";
import { useInView } from "react-intersection-observer";

function getUsers({ pageNum = 0 }: { pageNum?: number }) {
  const skip = pageNum * 10;
  return fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`).then(
    (res) => res.json()
  );
}

function App() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    getUsers({ pageNum }).then((data) => {
      setUsers(data.users);
      // Here we set a page limit in order to avoid unnecessary requests to the server
      setPageLimit(data.total / 10);
    });
  }, []);

  useEffect(() => {
    if (inView && pageNum <= pageLimit) {
      getUsers({ pageNum }).then((data) => {
        setUsers((prevState) => [...prevState, ...data.users]);
        setPageNum((prevPage) => prevPage + 1);
      });
    }
  }, [inView]);

  return (
    <div className="App">
      <>
        <h1 className="text-3xl font-bold underline">React Infinite scroll!</h1>
        <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
          {users &&
            users.map((user, index) => {
              if (index === users.length - 1) {
                return <UserCard {...user} key={user.id} ref={ref} />;
              } else {
                return <UserCard {...user} key={user.id} />;
              }
            })}
        </div>
      </>
    </div>
  );
}

export default App;
