import Category from "@/models/Categories";

export const getCategories = async () => {
  try {
    const categories = await Category.find({ is_delete: 0 });
    // const cate = categories.map((cat) => {

    // })
    return categories;
  } catch (error) {
    console.log(error);
  }
};
