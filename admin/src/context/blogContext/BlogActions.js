//GET blogs
export const getBlogsStart = () => ({
  type: "GET_BLOGS_START",
})
  
export const getBlogsSuccess = (blogs) => ({
  type: "GET_BLOGS_SUCCESS",
  payload: blogs,
})
  
export const getBlogsFailure = () => ({
  type: "GET_BLOGS_FAILURE",
})

//DELETE blog
export const deleteBlogStart = () => ({
  type: "DELETE_BLOG_START",
})

export const deleteBlogSuccess = (id) => ({
  type: "DELETE_BLOG_SUCCESS",
  payload: id,
})

export const deleteBlogFailure = () => ({
  type: "DELETE_BLOG_FAILURE",
})



//CREATE blog
export const createBlogStart = () => ({
  type: "CREATE_BLOG_START",
})

export const createBlogSuccess = (blog) => ({
  type: "CREATE_BLOG_SUCCESS",
  payload: blog,
})

export const createBlogFailure = () => ({
  type: "CREATE_BLOG_FAILURE",
})


//UPDATE blog
export const updateBlogStart = () => ({
  type: "UPDATE_BLOG_START",
})

export const updateBlogSuccess = (blog) => ({
  type: "UPDATE_BLOG_SUCCESS",
  payload: blog,
})

export const updateBlogFailure = () => ({
  type: "UPDATE_BLOG_FAILURE",
})





  
  