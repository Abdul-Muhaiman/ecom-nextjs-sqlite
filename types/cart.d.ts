export type GetCartProduct = {
    id: number;
    userId: number | null;
} & AddCartProduct;

export type AddCartProduct = {
    productId: number,
    productName: string,
    productPrice: number,
    productImage: string | null,
    quantity: number
}