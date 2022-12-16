const User = require('../schema/user.schema');
const Post=require('../schema/post.schema')

module.exports.getUsersWithPostCount = async (req, res) => {
    try {
        //TODO: Implement this API
        let page=req.query.page || 1;
        let usersPerPage=10;
        let limit=parseInt(usersPerPage);
        
        let users= await User.find().select({__v:0}).skip(page * usersPerPage).limit(limit);
        const posts= await Post.find();


      

    //     let page=req.query.page || 1;
    //     let usersPerPage=10;
    //     let limit=parseInt(usersPerPage)

    //     let dataOne = await User.aggregate([{$lookup:{
    //         from:"Post",
    //         localField:"_id",
    //         foreignField:"userId",
    //         as:"posts"


    // }}]).skip(page * usersPerPage).limit(limit)

    let totalPages=10
    let hasNextPage=totalPages/(limit * page)
    

    let pagination= {
        "totalDocs": 100,
        "limit": 10,
        "page":parseInt(page),
        "totalPages": 10,
        "pagingCounter": 1,
        "hasPrevPage": page>1?true:false,
        "hasNextPage": hasNextPage > 1 ? page + 1 : true,
        "prevPage": page > 1 ? page - 1 : null,
        "nextPage": ++page
    };



        let post=0;
        let postList = []
        let someList = []
       
        for(let i=0;i<users.length;i++){
            post=0;
            for(let j=0;j<posts.length;j++){
                if(users[i]._id.toString()===posts[j].userId.toString()){
                    post++
                }
            }
            postList.push(post)
            

        }
        for(let i=0;i<postList.length;i++){
            let obj={}
            obj.userId = users[i]._id
            obj.name = users[i].name
            obj.posts=postList[i]

            someList.push(obj)
            
        }

         users=someList
        //console.log(someList)
        res.status(200).json({
            data:{users, pagination}
        })
    } catch (error) {
        res.send({error: error.message});
    }
}