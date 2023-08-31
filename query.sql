-- 채팅방 리스트 조회(*)
SELECT cr.room_id, 
       cr.room_name, 
       cr.create_date, 
       CASE WHEN rp.user_id = 'admin2' THEN rp_opponent.user_id ELSE rp.user_id END AS participant_user_id,
       ui.profile_img,
       ui.nickname AS participant_nickname,
       cm.chat_id,
       IFNULL(unread_counts.unread_count, 0) AS unread_count,
       COALESCE(cm.message, 'No messages') as message,
       cm.message_date
FROM chat_rooms cr
JOIN room_participants rp ON cr.room_id = rp.room_id
JOIN room_participants rp_opponent ON cr.room_id = rp_opponent.room_id AND rp_opponent.user_id != 'admin2'
JOIN user_info ui ON ui.user_id = rp_opponent.user_id
LEFT JOIN (
    SELECT cr.room_id,
       COALESCE(unread_count, 0) AS unread_count
FROM chat_rooms cr
JOIN room_participants rp ON cr.room_id = rp.room_id
LEFT JOIN (
    SELECT cm.room_id,
           COUNT(*) AS unread_count
    FROM chat_messages cm
    LEFT JOIN message_reads mr ON cm.chat_id = mr.chat_id AND mr.user_id = 'admin2'
    JOIN room_participants rp ON cm.room_id = rp.room_id
    WHERE cm.user_id = rp.user_id 
      AND cm.room_id = rp.room_id
      AND rp.user_id != 'admin2'
      AND mr.read_id IS NULL
    GROUP BY cm.room_id
) unread_counts ON cr.room_id = unread_counts.room_id
WHERE rp.user_id = 'admin2'
) unread_counts ON cr.room_id = unread_counts.room_id
LEFT JOIN (
    SELECT room_id, MAX(chat_id) AS max_chat_id
    FROM chat_messages
    GROUP BY room_id
) max_chat ON cr.room_id = max_chat.room_id
LEFT JOIN chat_messages cm ON max_chat.room_id = cm.room_id AND max_chat.max_chat_id = cm.chat_id
WHERE rp.user_id = 'admin2';

-- 'admin2'와 'aaaa' 간의 채팅 내역 조회 쿼리(*)
SELECT cm.chat_id,
       cm.message_date, 
       CASE WHEN cm.user_id = 'admin2' THEN 'admin2' ELSE 'aaaa' END AS sender,
       cm.message,
       ui.profile_img
FROM chat_messages cm
JOIN chat_rooms cr ON cm.room_id = cr.room_id
JOIN room_participants rp ON cr.room_id = rp.room_id
JOIN user_info ui ON ui.user_id = cm.user_id
WHERE (rp.user_id = 'admin2' AND cm.user_id = 'aaaa')
   OR (rp.user_id = 'aaaa' AND cm.user_id = 'admin2')
ORDER BY cm.message_date;

위 쿼리는 'admin2' 사용자와 'aaaa' 사용자 간의 채팅 내역을 조회합니다. 결과는 각 메시지의 날짜(message_date), 
발신자(메시지를 보낸 사용자), 그리고 메시지 내용으로 나타납니다. 
결과는 메시지 날짜 순서로 정렬됩니다.

이 쿼리에서 'admin2'와 'aaaa' 사용자 간의 채팅방의 실제 조인 조건을 확인하여 실제 데이터로 대체해주셔야 합니다.

-- 채팅방 생성할때(*)
-- admin2와 aaaa의 대화를 위한 채팅방 생성
INSERT INTO chat_rooms (room_name, create_date)
VALUES ('Admin2 and aaaa Chat', NOW());
-- 방금 생성된 채팅방의 ID 가져오기
SET @room_id = LAST_INSERT_ID();
-- admin2와 aaaa를 채팅방에 추가
INSERT INTO room_participants (user_id, room_id)
VALUES ('admin2', @room_id), ('aaaa', @room_id);

-- 메세지 보낼때(*)
INSERT INTO chat_messages (room_id, user_id, message)
SELECT rp.room_id, 'admin2', '뭐하세요!'
FROM room_participants rp
JOIN room_participants rp_opponent ON rp.room_id = rp_opponent.room_id
WHERE rp.user_id = 'admin2' AND rp_opponent.user_id = 'aaaa'
LIMIT 1;
위 쿼리에서 'Your_Message_Content_Here' 부분에 보내고자 하는 실제 메시지 내용을 삽입하면 됩니다. 
이 쿼리는 'admin2' 사용자와 'aaaa' 사용자 간의 채팅방을 찾고, 
해당 채팅방의 room_id와 'admin2'의 user_id, 그리고 지정한 메시지 내용을 chat_messages 테이블에 삽입합니다.

주의: 위 쿼리는 room_participants 테이블에서 'admin2'와 'aaaa' 간의 채팅방을 찾을 때, 
해당 채팅방이 이미 생성되어 있는 것을 전제로 합니다. 채팅방이 생성되어 있지 않은 경우에는 먼저 채팅방을 생성해야 합니다.


-- 'admin2'가 'aaaa'와의 채팅방 삭제 쿼리(*)
DELETE FROM chat_rooms
WHERE room_id IN (
    SELECT rp.room_id
    FROM room_participants rp
    JOIN room_participants rp_opponent ON rp.room_id = rp_opponent.room_id
    WHERE (rp.user_id = 'admin2' AND rp_opponent.user_id = 'aaaa')
       OR (rp.user_id = 'aaaa' AND rp_opponent.user_id = 'admin2')
);

위 쿼리는 'admin2'와 'aaaa' 사용자 간의 채팅방을 삭제합니다. 이 쿼리는 다음 작업을 수행합니다:
room_participants 테이블을 사용하여 'admin2'와 'aaaa' 사용자 간의 채팅방 room_id를 찾습니다.
chat_rooms 테이블에서 해당 room_id에 해당하는 채팅방 데이터를 삭제합니다.

주의: 위 쿼리를 실행하면 해당 채팅방과 관련된 모든 데이터가 삭제됩니다. 
이 쿼리를 실행하기 전에 삭제할 채팅방과 관련된 데이터를 신중하게 확인한 후 사용하시기 바랍니다.


-- 'admin2'와 'aaaa' 간의 채팅방 이름 변경 쿼리(*)
UPDATE chat_rooms cr
JOIN room_participants rp ON cr.room_id = rp.room_id
JOIN room_participants rp_opponent ON cr.room_id = rp_opponent.room_id
SET cr.room_name = 'New_Chat_Room_Name'
WHERE (rp.user_id = 'admin2' AND rp_opponent.user_id = 'aaaa')
   OR (rp.user_id = 'aaaa' AND rp_opponent.user_id = 'admin2');

위 쿼리는 'admin2'와 'aaaa' 사용자 간의 채팅방 이름을 변경합니다. 이 쿼리는 다음 작업을 수행합니다:
room_participants 테이블을 사용하여 'admin2'와 'aaaa' 사용자 간의 채팅방 room_id를 찾습니다.
chat_rooms 테이블에서 해당 room_id에 해당하는 채팅방의 room_name을 새로운 이름으로 업데이트합니다.

주의: 위 쿼리를 실행하면 채팅방의 이름이 변경됩니다. 
이 쿼리를 실행하기 전에 변경할 채팅방과 신규 이름을 신중하게 확인한 후 사용하시기 바랍니다.

-- 읽음 처리하는 쿼리
-- 'admin2'가 'aaaa'에게 보낸 메시지 중 마지막 메시지의 chat_id 가져오기
SET @last_message_id = (
    SELECT MAX(chat_id)
    FROM chat_messages
    WHERE user_id = 'admin2'
      AND room_id = 3
);

-- 마지막 메시지보다 작은 chat_id를 가진 모든 메시지를 'aaaa'가 읽음 처리하는 쿼리
INSERT INTO message_reads (chat_id, user_id)
SELECT cm.chat_id, 'aaaa'
FROM chat_messages cm
WHERE cm.chat_id <= @last_message_id
  AND cm.room_id = 3
  AND NOT EXISTS (
      SELECT 1
      FROM message_reads mr
      WHERE mr.chat_id = cm.chat_id
        AND mr.user_id = 'aaaa'
  );

위 쿼리에서 'admin2_aaaa_room_id' 부분은 'admin2'와 'aaaa' 사용자 간의 채팅방의 room_id를 의미합니다.
이 부분은 실제로 사용되는 데이터로 대체되어야 합니다.
위 쿼리를 실행하면, 먼저 해당 메시지의 chat_id를 가져온 다음, 'aaaa' 사용자가 이 메시지를 읽었다는 
정보를 message_reads 테이블에 추가합니다. 이로써 'aaaa' 사용자가 어떤 메시지를 읽었는지를 기록할 수 있습니다.

주의: 이 쿼리는 특정 메시지의 읽음 상태를 기록하는 것이며, 메시지 ID와 사용자 ID에 주의하여 사용해야 합니다.

-- 'admin2'가 'aaaa'에게 보낸 메시지 중 'aaaa'가 읽은 메시지 여부 확인 쿼리
SELECT cm.message, 
       CASE WHEN mr.read_id IS NOT NULL THEN '읽음' ELSE '안읽음' END AS read_status
FROM chat_messages cm
LEFT JOIN message_reads mr ON cm.chat_id = mr.chat_id AND mr.user_id = 'aaaa'
WHERE cm.user_id = 'admin2' 
  AND cm.room_id = '실제_채팅방_room_id';

위 쿼리에서 'admin2_aaaa_room_id'는 'admin2'와 'aaaa' 사용자 간의 채팅방의 room_id를 의미합니다. 
실제 데이터로 대체되어야 합니다.

이 쿼리는 'admin2' 사용자가 'aaaa' 사용자에게 보낸 메시지 중에서 
'aaaa' 사용자가 읽은 메시지 여부를 확인합니다. 
결과는 각 메시지와 해당 메시지의 읽음 상태를 나타내는 '읽음' 또는 '안읽음'으로 표시됩니다.