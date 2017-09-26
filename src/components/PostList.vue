<template>
    <article class="_s5vjd">
        <header class="_7b8e">
            <a class="_pg23k _i2o1o">
                <img class="_rewi8" src="http://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="">
            </a>
            <div class="_j56ec">
                <span class="_2g7d5">{{ post.owner.username }}</span>
            </div>
        </header>
        <div class="_e3il2">
            <img class="_2di5" :src="post.imageUrl" alt="">
        </div>
        <div class="_ebcx">
            <div class="_4a48i">
                <ul class="_b0tqa mb-0">
                    <li class="_ezgzd">
                        <span class="_2g7d5 _95hvo">{{ post.owner.username }}</span>
                        <span>{{ post.caption }}</span>
                    </li>
                </ul>
            </div>
            <div class="_ha6c6">
                <time class="_p29ma">{{ timestamp }}</time>
            </div>
        </div>
    </article>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        post: {
            type: Object,
            default: function () {
                return { caption: '', imageUrl: '', createdAt: '', owner: '' }
            }
        }
    },
    computed: {
        timestamp: function () {
            const date = new Date(this.post.createdAt).toISOString()
            return moment(date).fromNow()
        }
    }
}
</script>
