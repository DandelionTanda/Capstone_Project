export default async function filterDiscount(discount, shift) {
  const filteredDiscount = await discount.filter((item) =>{
      return item.onshift === shift;
    }) 
    return filteredDiscount;          
}