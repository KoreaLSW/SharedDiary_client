import { GetComment } from '../type/comment';

type Props = {
    info: GetComment;
};

export function CommentCard({ info }: Props) {
    return <div>{info.contents}</div>;
}
