<template>
<view>
<template name="shareDialog">
    <view @tap.native.stop="hideShareDialog" catchtouchmove="disMove" class="share-dialog" v-if="isShareDialogShow">
        <view class="share-load">
            <view class="util-loadmore" v-if="!shareQuanImage">
                <view class="util-loading"></view>
                <view class="util-loadmore-tips">正在加载海报</view>
            </view>
        </view>
        <view class="share-image">
            <image mode="aspectFill" :src="shareQuanImage"></image>
        </view>
        <view class="share-dialog-area">
            <view @tap.native.stop="clickNull" class="share-to-user" hoverClass="class-hover">
                <image src="../static/image/share-user.png"></image>
                <button openType="share"></button>
                <view class="share-to-user-text">转发好友</view>
            </view>
            <view @tap.native.stop="saveShareImage" class="share-to-quan" :data-article-id="clickShareArticleId" :data-article-index="clickShareArticleIndex" hoverClass="class-hover" v-if="!sensitive">
                <image src="../static/image/share-quan.png"></image>
                <view class="share-to-user-text">保存相册</view>
            </view>
        </view>
    </view>
</template>
</view>
</template>

