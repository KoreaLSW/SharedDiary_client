import axios from 'axios';
import { Follow } from '../type/follow';
import HttpClient from '../network/http';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getFollower(followerId: string): Promise<any> {
    const url: string = '/follow/follower';
    return http.client
        .get(url, { params: { followerId } })
        .then((result) => result);
}

export async function getFollowing(followingId: string): Promise<any> {
    const url: string = '/follow/following';
    return http.client
        .get(url, { params: { followingId } })
        .then((result) => result);
}

export async function getFollowCheck(follow: Follow): Promise<any> {
    const url: string = '/follow/check';
    return http.client
        .get(url, {
            params: {
                followerId: follow.followerId,
                followingId: follow.followingId,
            },
        })
        .then((result) => result);
}

export async function create(follow: Follow): Promise<any> {
    const url: string = '/follow';
    return http.client.post(url, follow, headers).then((result) => result);
}

export async function remove(follow: Follow): Promise<any> {
    const url: string = '/follow';
    return http.client
        .delete(url, {
            params: {
                followerId: follow.followerId,
                followingId: follow.followingId,
            },
        })
        .then((result) => result);
}
