const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes += element.likes
    })
    return likes
    ;
}

const favoriteBlog = (blogs) => {
    let mostLiked = blogs[0]
 blogs.forEach(blog => {
    if(mostLiked.likes < blog.likes){
        mostLiked = blog
    }
 })
 return mostLiked
}
// jos kirjoittaja on uusi luodaan uusi objekti, jos taas ei ole niin liitetään vanhan blogien määrään +1
// tämän jälkeen käydään lista objekteista läpi ja selvitetään kenellä on eniten blogeja.
// ei varmaankaan järkevin tapa toteuttaa mutta tällä mennään 
const mostBlogs = (blogs) => {
    let mostPublished = blogs[0]
    let authorList = []
    let newAuthor = true
    blogs.forEach(blog => {
    authorList.forEach(author => {
        console.log("CURRENT AUTHOR AND BLOG",author,blog)
        if(author.name === blog.author){
            author.amount = author.amount + 1
            newAuthor = false
            console.log(authorList,"AFTER ADDITION AFTER ADDITION")
        }
    })
    if(newAuthor){
        authorList.push({
            name: blog.author,
            amount: 1
        })
    console.log(authorList,"AFTER PUSH AFTER PUSH AFTER PUSH AFTER PUSH")
    }
newAuthor = true
    })
    mostPublished = authorList[0]
   authorList.forEach(author => {
    if(mostPublished.amount < author.amount){
        mostPublished = author
    }
   }) 
console.log(mostPublished, "MOST PUBLISHED")
return({
    author: mostPublished.name,
    blogs: mostPublished.amount
})

}

const mostLikes = (blogs) => {
    let authorList = []
    let newAuthor = true
    let mostLiked = blogs[0]
    blogs.forEach(blog => {
     authorList.forEach(author => {
    if(author.name === blog.author){
        author.amount = author.amount + blog.likes
            newAuthor = false
            console.log(authorList,"AFTER ADDITION AFTER ADDITION")
    }

     })
     if(newAuthor){
        authorList.push({
            name: blog.author,
            amount: blog.likes
        })
    console.log(authorList,"AFTER PUSH AFTER PUSH AFTER PUSH AFTER PUSH")
    }
newAuthor = true
    })
    mostLiked = authorList[0]
    authorList.forEach(author => {
        if(mostLiked.amount < author.amount){
            mostLiked = author
        }
       }) 
    console.log(mostLiked, "MOST PUBLISHED")
    return({
        author: mostLiked.name,
       likes: mostLiked.amount
    })
    
}
  
  module.exports = {
    dummy , 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }