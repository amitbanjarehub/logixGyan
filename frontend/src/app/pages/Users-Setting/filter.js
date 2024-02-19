import { companyServices } from "app/services/companyservices";
import { useState } from "react";

export const useGetUsers = (filters) => {
  // Notice we only use `employees` as query key, because we want to preserve our cache
  return (useQuery(['Users'], userServices.alist) => fetchUsers(filters)
// We pass a third argument to our useQuery function, an options object
{
  select: (Users) => Users.filter((employee) => Users.isApproved.includes(filters.isApproved)),
      }
    );
  };

const SomeComponent = () => {
  const [filters, setFilters] = useState({});
  const { data } = useGetUsers(filters);

  const onChange = (value) => {
    setFilters(value)
  }

  // Some fancy UI that calls onChange function upon filter selection in the UI
}


const licompany = useQuery(['company-list'], companyServices.list);

console.log("result of li company: ", licompany);

const liuser = useQuery(['user-list'], userServices.alist);
// const isApproved = liuser?.data?.data.find()  


console.log("result of liuser: ", liuser);