<template>
    <section class="_owark mt-10">
        <postlist v-for="post in allPosts" :key="post._id" :post="post" />
        <newpost />
    </section>
</template>

<script>
import NewPost from '@/components/NewPost'
import PostList from '@/components/PostList'
import gql from 'graphql-tag'

const allPostsQuery = gql`
    query allPosts {
        allPosts {
            _id
            caption
            imageUrl
            createdAt
            owner {
                _id
                username
            }
        }
    }
`

export default {
    data: () => ({
        allPosts: {}
    }),
    apollo: {
        allPosts: {
            query: allPostsQuery
        }
    },
    components: {
        'newpost': NewPost,
        'postlist': PostList
    }
}
</script>