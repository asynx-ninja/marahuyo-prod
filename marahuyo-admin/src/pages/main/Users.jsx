import Header from "../../components/global/Header";
import Sidebar from "../../components/global/Sidebar";
import Table from "../../components/main/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = (props) => {
  const id = props.id;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/get_admin_info/${id}`);
      setData({ id, ...res.data[0] });
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Header data={data} />
      <Sidebar id={id} />
      <Table data={data} id={id}/>
    </div>
  );
};

export default Users;
