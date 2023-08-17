import { useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import { GetComment } from '../type/comment';
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';

import { getTimeDifference } from '../timedifference/timedifference';
import useCommentLike from '../hooks/commentLike';
import { CommentLike } from '../type/commentLike';
import { userAtom } from '../recoil/authAtom';
import { LikeButton } from '../theme/theme';

type Props = {
    info: GetComment;
};

export function CommentCard({ info }: Props) {
    const { createLike, removeLike } = useCommentLike();
    const user = useRecoilValue(userAtom);

    const [showFullText, setShowFullText] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(info.like_count);
    const [liked, setLiked] = useState<boolean>(info.like_check === 1);
    const [commentLike, setCommentLike] = useState<CommentLike>({
        comment_id: '',
        user_id: '',
    });

    //console.log('commendCard', liked);

    useEffect(() => {
        setCommentLike({
            comment_id: info.comment_id.toString(),
            user_id: user!,
        });
    }, []);

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const toggleLike = () => {
        if (liked) {
            setLikeCount(likeCount - 1);

            removeLike.mutate(commentLike, {
                onSuccess(data, variables, context) {},
                onError(error: any, variables, context) {},
            });
        } else {
            setLikeCount(likeCount + 1);

            createLike.mutate(commentLike, {
                onSuccess(data, variables, context) {},
                onError(error: any, variables, context) {},
            });
        }
        setLiked(!liked);
    };

    return (
        <CommentContainer>
            <AiOutlineUser className='no-profile' />
            <CommentContent>
                <CommentTopBox>
                    <CommentUsername>{info.nickname}</CommentUsername>
                    <CommentText>
                        {showFullText ? (
                            <>
                                <FullCommentText>
                                    {info.contents}
                                </FullCommentText>
                                <ShowLessButton onClick={toggleFullText}>
                                    접기
                                </ShowLessButton>
                            </>
                        ) : (
                            <>
                                {info.contents.length > 100
                                    ? info.contents.slice(0, 150) + '...'
                                    : info.contents}
                                {info.contents.length > 100 && (
                                    <ShowMoreButton onClick={toggleFullText}>
                                        더 보기
                                    </ShowMoreButton>
                                )}
                            </>
                        )}
                    </CommentText>
                </CommentTopBox>
                <CommentBottomBox>
                    <CommentTime>
                        {getTimeDifference(new Date(info.create_date))}
                    </CommentTime>
                    <LikeText>좋아요 {likeCount}개</LikeText>
                </CommentBottomBox>
            </CommentContent>

            <LikeButton
                $liked={liked ? 'true' : 'false'}
                $type='comment'
                onClick={toggleLike}
            >
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </LikeButton>
        </CommentContainer>
    );
}

const CommentContainer = styled.div`
    display: flex;
    margin: 1.5rem 1rem;
    .no-profile {
        min-width: 2rem;
        height: 2rem;
        margin-right: 10px;
    }
`;

const CommentAvatar = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 10px;
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentTopBox = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
`;

const CommentUsername = styled.span`
    font-weight: bold;
    margin-right: 0.7rem;
    font-size: 0.8rem;
`;

const CommentText = styled.span`
    font-size: 0.8rem;
`;

const FullCommentText = styled.span`
    font-size: 0.8rem;
    white-space: pre-line;
`;

const ShowMoreButton = styled.button`
    font-size: 0.8rem;
    color: #007bff;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
`;

const ShowLessButton = styled.button`
    font-size: 0.8rem;
    color: #007bff;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
`;

const CommentBottomBox = styled.div`
    display: flex;
`;

const CommentTime = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.grayText};
    margin-right: 1rem;
`;

const LikeText = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.darkGrayText};
    font-weight: bold;
`;
