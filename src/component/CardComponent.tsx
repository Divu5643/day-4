import { Product } from "../utils/Product";
import React, { useEffect, useRef } from "react";

const CardComponent: React.FC<{
  data: Product;
  deleteProduct: Function;
  EditProduct:Function
}> = ({ data, deleteProduct,EditProduct }) => {
  const [isEditable, setIsEditable] = React.useState<boolean>(false);
const descriptionRef = useRef<HTMLDivElement>(null);
const titleRef = useRef<HTMLDivElement>(null);
const price = useRef(null);

  let product=data;
  let descriptionString = "";

  if (product.description.split(" ").length >= 15) {
    product.description.split(" ").map((word, index) => {
      if (index < 15) {
        descriptionString += word + " ";
      }
    });
    descriptionString += "...";
  }
  const MakeEditable = () => {
    if(isEditable){
        var content=""
        var descriptionContent=""
        if(titleRef.current){
           content =  titleRef.current.innerText;
        }
        if(descriptionRef.current){
            descriptionContent = descriptionRef.current.innerText;
        }
        let newProduct ={...data,title:`${content}`,description:descriptionContent};
        
        EditProduct(newProduct);

    }
    setIsEditable(!isEditable);
  };

  const handleDelete = (event: any) => {
    let id: number = Number(
      (event.target as HTMLButtonElement).getAttribute("data-product-id")
    );
    console.log("componentId:", id);
    deleteProduct(id);
  };


  useEffect(()=>{
    return ()=>{
        console.log("Product is being deleted")
    }
  },[])


  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.image}
        className="card-img-top"
        id="product-image"
        style={{ width: "80%" }}
      />
      <div className="card-body">
        <h5
          className="card-title"
          id="product-title"
          ref={titleRef}
          contentEditable={isEditable}
        >
          {product.title}
        </h5>
        <p
          className="card-text"
          id="card-description"
          ref={descriptionRef}
          contentEditable={isEditable}
        >
          {descriptionString}
        </p>
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={MakeEditable}>
            {isEditable ? "Save" : "Edit"}
          </button>
          <button
            className="btn btn-danger"
            data-product-id={product.id}
            onClick={(event) => {
              handleDelete(event);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardComponent;
