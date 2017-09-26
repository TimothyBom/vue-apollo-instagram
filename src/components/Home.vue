<template>
    <section class="_owark mt-10">
        <postlist v-for="post in allPosts" :key="post._id" :post="post" />
        <newpost />
    </section>
</template>

<script>
import gql from 'graphql-tag'
import NewPost from '@/components/NewPost'
import PostList from '@/components/PostList'

const queryPost = gql`
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
            query: queryPost
        }
    },
    components: {
        'newpost': NewPost,
        'postlist': PostList
    }
}
</script>