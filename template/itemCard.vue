<template>
<view>
<template name="itemCardForum">
    <view class="rank-list-item">
        <view @tap="goArticle" class="rank-item-article" :data-article-id="item.id">
            <text class="article-text">{{item.content}}</text>
            <view class="article-author">-- {{item.userNick}}</view>
        </view>
        <view class="rank-item-sidebar">
            <view class="forum-sidebar-head">
                <image :src="item.userHead" v-if="item.userHead"></image>
                <image src="../../image/avatar.png" v-else></image>
            </view>
            <view class="rank-sidebar-action">
                <view @tap="showShareDialog" class="share" :data-article-id="item.id" :data-article-index="index" hoverClass="class-hover">
                    <image class="share-icon" src="../static/image/share.png"></image>
                    <view class="share-text">分享</view>
                </view>
                <form @submit="clickLike" :data-article-id="item.id" :data-article-index="index" :data-article-liked="item.isLiked" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover">
                        <view class="like-image">
                            <image class="like-icon" src="../static/image/like.png" v-if="!item.isLiked"></image>
                            <image class="like-icon" src="../static/image/liked.png" v-if="item.isLiked"></image>
                        </view>
                        <view class="like-anim">
                            <image class="like-anim-image" src="../static/image/liked.png" v-if="item.likeAnim"></image>
                        </view>
                        <view class="like-num-area" :hidden="item.likeNum==0">
                            <view class="like-num">{{item.likeNum}}</view>
                        </view>
                        <view class="like-text">扎心</view>
                    </button>
                </form>
                <!-- <form bindsubmit="goArticle" data-article-id="{{item.id}}" data-article-index="{{index}}" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover" wx:if="{{!sensitive}}">
                        <view class="like-image">
                            <image class="like-icon" src="/image/comment.png"></image>
                        </view>
                        <view class="like-num-area" hidden="{{!item.commentNum}}">
                            <view class="like-num">{{item.commentNum}}</view>
                        </view>
                        <view class="like-text">补刀</view>
                    </button>
                </form> -->
            </view>
        </view>
    </view>
    <view class="list-ad" v-if="(index+1)%3==0">
        <ad unitId="adunit-0cc2c6eb033128d1"></ad>
    </view>
</template>
<!-- 热 -->
<template name="itemCardHot">
    <view class="main-list-item">
        <form @submit="goArticle" :data-article-id="item.id" :data-article-index="index" reportSubmit="true">
            <button class="main-item-article" formType="submit" hoverClass="main-item-article-hover">
                <text class="article-text">{{item.content}}</text>
                <view class="article-author">-- {{item.userNick}}</view>
            </button>
        </form>
        <view class="main-item-sidebar" :style="'height:' + (item.line*60+40) + 'rpx;'">
            <view class="date">
                <view class="date-text">
                    <view class="dayStr">{{mod.getDateArr(item.created_at)[2]}}</view>
                    <view class="date-line"></view>
                    <view class="month">{{mod.getMonthStr( mod.getDateArr(item.created_at)[1] )}}</view>
                </view>
            </view>
            <view class="main-sidebar-action">
                <view @tap="showShareDialog" class="share" :data-article-id="item.id" :data-article-index="index" hoverClass="class-hover">
                    <image class="share-icon" src="../static/image/share.png"></image>
                    <view class="share-text">分享</view>
                </view>
                <form @submit="clickLike" :data-article-id="item.id" :data-article-index="index" :data-article-liked="item.isLiked" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover">
                        <view class="like-image">
                            <image class="like-icon" src="../static/image/like.png" v-if="!item.isLiked"></image>
                            <image class="like-icon" src="../static/image/liked.png" v-if="item.isLiked"></image>
                        </view>
                        <view class="like-anim">
                            <image class="like-anim-image" src="../static/image/liked.png" v-if="item.likeAnim"></image>
                        </view>
                        <view class="like-num-area" :hidden="item.likeNum==0">
                            <view class="like-num">{{item.likeNum}}</view>
                        </view>
                        <view class="like-text">扎心</view>
                    </button>
                </form>
                <!-- <form bindsubmit="goArticle" data-article-id="{{item.id}}" data-article-index="{{index}}" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover" wx:if="{{!sensitive}}">
                        <view class="like-image">
                            <image class="like-icon" src="/image/comment.png"></image>
                        </view>
                        <view class="like-num-area" hidden="{{!item.commentNum}}">
                            <view class="like-num">{{item.commentNum}}</view>
                        </view>
                        <view class="like-text">补刀</view>
                    </button>
                </form> -->
            </view>
        </view>
    </view>
    <view class="list-ad" v-if="(index+1)%3==0">
        <ad unitId="adunit-6950d410c8b19891"></ad>
    </view>
</template>
<!-- 冷 -->
<template name="itemCardNew">
    <view class="main-list-item">
        <form @submit="goArticle" :data-article-id="item.id" :data-article-index="index" reportSubmit="true">
            <button class="main-item-article" formType="submit" hoverClass="main-item-article-hover">
                <text class="article-text">{{item.content}}</text>
                <view class="article-author">-- {{item.userNick}}</view>
            </button>
        </form>
        <view class="main-item-sidebar" :style="'height:' + (item.line*60+40) + 'rpx;'">
            <view class="date">
                <view class="date-text">
                    <view class="dayStr">{{mod.getDateArr(item.created_at)[2]}}</view>
                    <view class="date-line"></view>
                    <view class="month">{{mod.getMonthStr( mod.getDateArr(item.created_at)[1] )}}</view>
                </view>
            </view>
            <view class="main-sidebar-action">
                <view @tap="showShareDialog" class="share" :data-article-id="item.id" :data-article-index="index" hoverClass="class-hover">
                    <image class="share-icon" src="../static/image/share.png"></image>
                    <view class="share-text">分享</view>
                </view>
                <form @submit="clickLike" :data-article-id="item.id" :data-article-index="index" :data-article-liked="item.isLiked" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover">
                        <view class="like-image">
                            <image class="like-icon" src="../static/image/like.png" v-if="!item.isLiked"></image>
                            <image class="like-icon" src="../static/image/liked.png" v-if="item.isLiked"></image>
                        </view>
                        <view class="like-anim">
                            <image class="like-anim-image" src="../static/image/liked.png" v-if="item.likeAnim"></image>
                        </view>
                        <view class="like-num-area" :hidden="item.likeNum==0">
                            <view class="like-num">{{item.likeNum}}</view>
                        </view>
                        <view class="like-text">扎心</view>
                    </button>
                </form>
                <!-- <form bindsubmit="goArticle" data-article-id="{{item.id}}" data-article-index="{{index}}" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover" wx:if="{{!sensitive}}">
                        <view class="like-image">
                            <image class="like-icon" src="/image/comment.png"></image>
                        </view>
                        <view class="like-num-area" hidden="{{!item.commentNum}}">
                            <view class="like-num">{{item.commentNum}}</view>
                        </view>
                        <view class="like-text">补刀</view>
                    </button>
                </form> -->
            </view>
        </view>
    </view>
    <view class="list-ad" v-if="(index+1)%3==0">
        <ad unitId="adunit-0cc2c6eb033128d1"></ad>
    </view>
</template>
</view>
</template>

<script module="mod" lang="wxs" src="../utils/mod.wxs"></script>

