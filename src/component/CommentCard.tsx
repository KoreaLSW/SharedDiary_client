import { useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import { GetComment } from '../type/comment';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { getTimeDifference } from '../timedifference/timedifference';
import useCommentLike from '../hooks/commentLike';
import { CommentLike } from '../type/commentLike';
import { userAtom } from '../recoil/authAtom';
import { LikeButton } from '../theme/theme';
import { useCommentMutations } from '../hooks/comment';

type Props = {
    info: GetComment;
};

export function CommentCard({ info }: Props) {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const { removeComment } = useCommentMutations();
    const { createLike, removeLike } = useCommentLike();

    const [showFullText, setShowFullText] = useState<boolean>(false);
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

    const handleCommentRemove = () => {
        removeComment.mutate(
            { comment_id: info.comment_id, user_id: user! },
            {
                onSuccess(data, variables, context) {
                    window.alert('댓글이 삭제되었습니다.');
                },
                onError(error, variables, context) {
                    window.alert(`댓글삭제 실패...${error}`);
                },
            }
        );
    };

    return (
        <CommentContainer>
            <CommentAvatar
                src={info.profile_img ? info.profile_img : '/noprofile.jpg'}
                onClick={() => {
                    navigate(`/profile/${info.user_id}`);
                }}
            />
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
                    {user === info.user_id && (
                        <DeleteText onClick={handleCommentRemove}>
                            댓글삭제
                        </DeleteText>
                    )}
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
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
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
    white-space: nowrap;
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
    color: ${(props) => props.theme.colors.signature};
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
`;

const ShowLessButton = styled.button`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.signature};
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
    margin-right: 1rem;
`;

const DeleteText = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.red};
    font-weight: bold;
    cursor: pointer;
`;
