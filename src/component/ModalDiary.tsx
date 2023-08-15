import React, { useState } from 'react';
import styled from 'styled-components';
import { GetDiary } from '../type/diary';
import { useCommentMutations, useGetComment } from '../hooks/comment';
import { CreateComments, GetComment } from '../type/comment';
import { CommentCard } from './CommentCard';

type Props = {
    info: GetDiary;
    userId: string | undefined;
    toggleModal: () => void;
};

export function ModalDiary({ info, userId, toggleModal }: Props) {
    const [comment, setComment] = useState<CreateComments>({
        diary_id: info.diary_id.toString(),
        user_id: userId!,
        contents: '',
    });

    const { data, isLoading, isError } = useGetComment(
        info.diary_id.toString()
    );
    data && console.log('data', data.data);
    const { createCommentHook, removeCommentHook } = useCommentMutations();

    const handleAddComment = () => {
        // 댓글 추가 로직 구현
        console.log('Added comment:', comment);
        setComment((res) => ({
            ...res,
            contents: '',
        }));

        createCommentHook.mutate(comment, {
            onSuccess(data, variables, context) {},
            onError(error: any, variables, context) {},
        });
    };
    return (
        <ModalWrapper>
            <ModalContent>
                <LeftSection>
                    <p>{info.nickname}</p>
                </LeftSection>
                <RightSection>
                    {/* 댓글 정보 등을 보여주는 컴포넌트를 넣어주세요 */}
                    <ul>
                        {data &&
                            data.data.map((info: GetComment, index: number) => (
                                <CommentCard key={index} info={info} />
                            ))}
                    </ul>
                    <CommentBox>
                        <CommentInput
                            type='text'
                            value={comment.contents}
                            onChange={(e) =>
                                setComment((res) => ({
                                    ...res,
                                    contents: e.target.value,
                                }))
                            }
                            placeholder='댓글을 입력하세요'
                        />
                        <AddCommentButton onClick={handleAddComment}>
                            댓글 추가
                        </AddCommentButton>
                    </CommentBox>
                </RightSection>
            </ModalContent>
            <ModalCloseButton onClick={toggleModal}>&times;</ModalCloseButton>
        </ModalWrapper>
    );
}

// 모달 스타일
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    /* 스크롤바 스타일 변경 */
    ::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const ModalContent = styled.div`
    width: 80%;
    max-width: 850px;
    height: 90vh;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
    flex: 1;
    border-right: 1px solid #f0f0f0;
    overflow-y: auto;
`;

const RightSection = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const CommentBox = styled.div`
    position: sticky;
    top: 100%;
    bottom: -1px;

    width: 100.1%;
    height: 3rem;
    display: flex;
    align-items: center;
`;

const CommentInput = styled.input`
    width: 80%;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const AddCommentButton = styled.button`
    width: 20%;
    height: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 2rem;
`;
