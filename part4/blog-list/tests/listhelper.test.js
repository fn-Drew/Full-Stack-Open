const listHelper = require('../utils/list_helper')

const blogs = [
    {
        "title": "woah title of the post",
        "likes": 2
    },
    {
        "title": "another title yipee",
        "likes": 8
    },
    {
        "title": "ega goga!!!",
        "likes": 30
    }
]

const blogWithOnePost = [
    {
        "title": "ega goga!!!",
        "likes": 30
    }
]

const emptyList = []

// come back and do 4.6 and 4.7 at some point

describe("get total likes", () => {

    test('total likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(40)
    })

    test('when there is only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogWithOnePost)
        expect(result).toBe(30)
    })

    test('when there is no blogs, like should be 0', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

})
describe("get most likes", () => {

    test('return blog with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toBe(blogs[2])
    })

    test('return only blog', () => {
        const result = listHelper.mostLikes(blogWithOnePost)
        expect(result).toBe(blogWithOnePost[0])
    })

})
