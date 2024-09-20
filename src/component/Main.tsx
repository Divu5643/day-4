import React, { useEffect } from "react";
import { Product } from "../utils/Product";
import CardComponent from "./CardComponent";

const Main: React.FC = () => {
  const [dataList, setDataList] = React.useState<Product[]>([]);

  const deleteProduct = (id: number) => {
    console.log("delete:", id);
    let deletedList = dataList.filter((element) => {
      return element.id !== id;
    });
    setDataList(deletedList);
  };

  const EditProduct= (productData:Product)=>{  
    let newList =  dataList;
    let index  =  dataList.findIndex((prod)=>{return prod.id == productData.id})
    if(index!==-1){
      newList[index] = productData;
      console.log("New List :",newList)
      setDataList(newList);
    }
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((respose) => {
        setDataList(respose);
      });
  }, []);

  useEffect(()=>{
   console.log("A product has been changed")
  },[dataList])


  return (
    <>
      <div
        className="container d-flex justify-content-around gap-4"
        style={{ width: "80%", margin: "2rem auto", flexWrap: "wrap" }}
      >
     

        {dataList.map((product, index) => {
          console.log(product)
          return (
            <CardComponent
              key={index}
              data={product}
              deleteProduct={deleteProduct}
              EditProduct={EditProduct}
            />
          );
        })}
      </div>
    </>
  );
};

export default Main;
