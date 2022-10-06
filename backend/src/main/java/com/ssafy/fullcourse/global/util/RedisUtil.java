package com.ssafy.fullcourse.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate redisTemplate;
    // key를 통해 value 리턴
    public String getData(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setHashData(Long key, HashMap<Long, Float> map){
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.putAll(String.valueOf(key),map);
    }
    public Float getHashData(Long key1, Long key2){
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        return (Float) hashOperations.get(String.valueOf(key1),String.valueOf(key2));
    }
    public Map<Object, Object> getHashEntry(Long key1){
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        return hashOperations.entries(String.valueOf(key1));
    }

    // String key 해쉬 저장
    public void setStringHash(String key, HashMap<String, Long> map) {
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.putAll(key,map);
    }

    public Map<Object, Object> getStringHash(String key) {
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        return hashOperations.entries(key);
    }

    // 데이터 저장
    public void setData(String key, String value){
        ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    // 유효 기간 설정
    public void setDataExpire(String key, String value, long duration){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    // key를 통해 value 삭제
    public void deleteData(String key){
        redisTemplate.delete(key);
    }

    public void print(){
        Set<byte[]> keys = redisTemplate.getConnectionFactory().getConnection().keys("*".getBytes());

        Iterator<byte[]> it = keys.iterator();
        while(it.hasNext()){
            byte[] data = (byte[])it.next();
            System.out.println(new String(data, 0, data.length));
        }
    }
}
