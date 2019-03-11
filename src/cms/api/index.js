import service from '@/cms/utils/service.js'

export default {
  getUserProfile () {
    return service({
      url: '/api/profile',
      method: 'GET',
    })
  },
  mergeChunk (data) {
    return service({
      url: '/api/uploads/mergeChunk',
      method: 'POST',
      data: data,
    })
  },
  updateVideoAsset (id, data) {
    return service({
      url: `/api/videos/${id}/asset`,
      method: 'PUT',
      data: data,
    })
  },
  getArticleList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/articles`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage,
      },
    })
  },
  getArticleDetail (id) {
    return service({
      url: `/api/articles/${id}`,
      method: 'GET',
    })
  },
  getVideoList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/videos`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage,
      },
    })
  },
  getVideoDetail (id) {
    return service({
      url: `/api/videos/${id}`,
      method: 'GET',
    })
  },
  createNewVideo (data) {
    return service({
      url: '/api/videos',
      method: 'POST',
      data: data,
    })
  },
  checkMD5Existed (md5) {
    return service({
      url: `/api/uploads/md5/${md5}`,
      method: 'GET',
    })
  },
  getSongList (pageSize = 10, curPage = 1) {
    return service({
      url: `/api/songs`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        curPage: curPage,
      },
    })
  },
  getSongDetail (id) {
    return service({
      url: `/api/songs/${id}`,
      method: 'GET',
    })
  },
  createNewSong (data) {
    return service({
      url: '/api/songs',
      method: 'POST',
      data: data,
    })
  },
  updateSongAsset (id, data) {
    return service({
      url: `/api/songs/${id}/asset`,
      method: 'PUT',
      data: data,
    })
  },
  getDemo (id, pageSize = 10, curPage = 1) {
    return service({
      url: `/api/getDemo/${pageSize}/${curPage}`,
      method: 'GET',
      params: {
        id: id,
      },
    })
  },
  submitComment (data) {
    return service({
      url: '/api/comments',
      method: 'POST',
      data: data,
    })
  },
  markLike (id, type) {
    return service({
      url: `/api/like/${id}`,
      method: 'POST',
      data: {
        type, // article comment
      },
    })
  },
  uploadAvatar (data) {
    return service({
      url: '/api/upload/avatar',
      method: 'POST',
      data: data,
    })
  },
  postDemo (data) {
    return service({
      url: '/api/postDemo',
      method: 'POST',
      data: data,
    })
  },
  putDemo () {
    return service({
      url: '/api/putDemo',
      method: 'PUT',
    })
  },
  deleteDemo () {
    return service({
      url: '/api/deleteDemo',
      method: 'DELETE',
    })
  },
}
