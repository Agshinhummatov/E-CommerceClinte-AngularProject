import { List_Product_Image } from "./list_product_image";

export class List_Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    createdDate: Date;
    updatedDate: Date;
    productImagesFile?: List_Product_Image[];
    imagePath: string;
}