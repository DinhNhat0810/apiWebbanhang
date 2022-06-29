const BlogReducer = (state, action) => {
    switch (action.type) {
        //GET
        case "GET_BLOGS_START":
            return {
                blogs: [],
                isFetching: true,
                error: false,
            }

        case "GET_BLOGS_SUCCESS":
            return {
                blogs: action.payload,
                isFetching: false,
                error: false,
            }

        case "GET_BLOGS_FAILURE":
            return {
                blogs: [],
                isFetching: false,
                error: true,
            }
        
        //DELETE
        case "DELETE_BLOG_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            }

        case "DELETE_BLOG_SUCCESS":
            return {
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                isFetching: false,
                error: false,
            }

        case "DELETE_BLOG_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            }

        //CREATE
        case "CREATE_BLOG_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            }

        case "CREATE_BLOG_SUCCESS":
            return {
                blogs: [...state.blogs, action.payload],
                isFetching: false,
                error: false,
            }

        case "CREATE_BLOG_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            }

        //UPDATE
        case "UPDATE_BLOG_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            }

        case "UPDATE_BLOG_SUCCESS":
            return {
                blogs: [...state.blogs, action.payload],
                isFetching: false,
                error: false,
            }

        case "UPDATE_BLOG_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            }
    

        default: 
            return { ...state }
        
    }

}

export default BlogReducer