---
title: SpringBoot配置mybatis使用的两种方式
date: 2022-08-06 18:55:55
tags: Java
categories: Dev
---

<!-- more -->

目前在SpringBoot中的使用Mybatis的pom文件是

```
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
```

**1. 注解版本**

添加相关的依赖

```
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        <!--         mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--         lombok 自动创建bean的 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

添加properties配置文件

```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

配置完后，SpringBoot会加载spring.datasource的所有配置。数据源就会自动注入到 sqlSessionFactory 中，sqlSessionFactory 会自动注入到 Mapper 中。

在主类上开启mapper包扫描

```
@MapperScan("com.yuanzhou.mybatis.mapper")
@SpringBootApplication
public class MybatisApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatisApplication.class, args);
    }

}
```

创建mapper接口，在方法上方添加各项注解

```
public interface UserMapper {
    
    @Select("select * from user")
    @Results({
        @Result(property="id", column="id"),
        @Result(property="name", column="name"),
        @Result(property="age", column="age"),
        @Result(property="email", column="email")
    })
    List<User> userList();
}
```

之后测试是正确能读取到的

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class MybatisTestCase {
    
    @Autowired
    UserMapper userMapper;
    
    @Test
    public void selectTest() {
        
        List<User> list = userMapper.list();
        list.forEach(System.out::println);
    }
    
}
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806185712.png)

 

 **2.XML版本**（前公司使用的）

在properties文件中添加如下配置：

```
#实体类映射地址（我这里和mapper文件放在一起了，impl文件夹等同于mapper接口的实现了）
mybatis.mapper-locations=classpath:com/yuanzhou/mybatis/mapper/impl/*.xml
```

在上述位置中添加user的映射文件

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.yuanzhou.mybatis.mapper.UserMapper">

<resultMap id="BaseResultMap" type="com.yuanzhou.mybatis.entity.User">
    <id property="id" column="id" jdbcType="VARCHAR"></id>
    <result property="name" column="name" jdbcType="VARCHAR"></result>
    <result property="age" column="age" jdbcType="VARCHAR"></result>
    <result property="email" column="email" jdbcType="VARCHAR"></result>
</resultMap>

<sql id="BaseColumnList">id, name, age, email</sql>


<select id="getList" resultMap="BaseResultMap">
    select <include refid="BaseColumnList" /> from user
</select>

</mapper>
```

mapper层直接写简单的接口方法就可以了，相较之前的版本，直接把注解删除即可

个人角色第二种方法更简洁一下，接口里看起来更加干净
