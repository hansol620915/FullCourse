package com.ssafy.fullcourse.global.util;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;

public class QueryDslUtil {
    public static OrderSpecifier<?> getSortedColum(Order order, Path<?> parent, String fieldName){
        Path<Object> fieldPath = Expressions.path(Object.class,parent,fieldName);
        return new OrderSpecifier(order,fieldPath);
    }
}
