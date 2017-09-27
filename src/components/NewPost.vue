<template>
    <div class="modal fade" id="NewPost">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Post</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Caption</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Write a caption..." v-model="caption">
                            </div>
                        </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Image</label>
                        <div class="col-sm-10">
                            <input type="file" class="form-control-file" accept="image/*" @change="uploadImage">
                        </div>
                    </div>
                    </form>
                    <div v-show="imageUrl" class="row justify-content-center">
                        <img :src="imageUrl" alt="" width="293px" height="293px">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" :disabled="caption === '' || imageUrl === ''" @click="onSubmit">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import request from 'superagent'

const createPost = gql`
    mutation ($caption: String!, $publicId: String!, $imageUrl: String!, $token: String!) {
        createPost(caption: $caption, publicId: $publicId, imageUrl: $imageUrl, token: $token) {
            _id
            caption
            imageUrl
        }
    }
`

export default {
  data: () => ({
      caption: '',
      publicId: '',
      imageUrl: '',
      token: localStorage.jwtToken ? localStorage.jwtToken : ''
  }),
  methods: {
      uploadImage(e) {
          const image = e.target.files[0]
          const url = 'https://api.cloudinary.com/v1_1/timothybom/image/upload'
          const params = {
              api_key: '414499466558622',
              api_secret: 'QJZgMEwp3lJt5_KlG4EIaV-zsYc',
              upload_preset: 'hktsyikf'
          }

          const uploadRequest = request.post(url)
          uploadRequest.attach('file', image)
          Object.keys(params).forEach(key => {
              uploadRequest.field(key, params[key])
          })
          uploadRequest.end((err, res) => {
              if (err) {
                  console.log(err)
              }
              this.publicId = res.body.public_id
              this.imageUrl = res.body.secure_url
          })
      },
      onSubmit() {
          const caption = this.caption
          const publicId = this.publicId
          const imageUrl = this.imageUrl
          const token = this.token

          this.caption = ''
          this.publicId = ''
          this.imageUrl = ''
          this.token = ''

          this.$apollo.mutate({
              mutation: createPost,
              variables: {
                  caption,
                  publicId,
                  imageUrl,
                  token
              }
          }).then(() => {
              this.$router.go('/')
          })
      }
  }
}
</script>
