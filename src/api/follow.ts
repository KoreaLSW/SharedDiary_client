import axios from 'axios';
import { Follow } from '../type/follow';
import HttpClient from '../network/http';

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
    return http.client.post(url, follow).then((result) => result);
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
