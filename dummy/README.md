# Dummy Data

```md
psql -U ky0422 -d board_db -f ./dummy.sql
```

## Users

```
                                     Table "public.users"
  Column  |          Type          | Collation | Nullable |              Default              
----------+------------------------+-----------+----------+-----------------------------------
 id       | integer                |           | not null | nextval('users_id_seq'::regclass)
 username | character varying(32)  |           | not null | 
 password | character varying(255) |           | not null | 
 email    | character varying(320) |           | not null | 
 nickname | character varying(32)  |           |          | 
```

```sql
-- Dummy data for users
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('foo', 'testsecurePassword1234@', 'foo@example.com', 'First User');
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('rlawnsdud', 'password123', 'normal8781@gmail.com', 'Kim Jun Young');
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('admin', 'adminPassword1234@', 'admin@example.com', 'Admin');
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('john', 'superSafePw1234@', 'john@example.com', 'John Doe');
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('jane', 'anotherSecurePassword1234@', 'jane@example.com', 'Jane Doe');
INSERT INTO users ("username", "password", "email", "nickname") VALUES ('guest', 'qwerty1234@', 'guest@example.com', 'Guest User');
```

## Topics

```
                                       Table "public.topics"
   Column    |           Type           | Collation | Nullable |              Default               
-------------+--------------------------+-----------+----------+------------------------------------
 id          | integer                  |           | not null | nextval('topics_id_seq'::regclass)
 name        | character varying(32)    |           | not null | 
 description | character varying(255)   |           | not null | 
 createdAt   | timestamp with time zone |           | not null | now()
 creatorId   | integer                  |           |          | 
```

```sql
-- Dummy data for topics
INSERT INTO topics ("name", "description", "creatorId") VALUES ('programming', 'Programming discussions and resources.', 1);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('technology', 'Latest trends in technology.', 2);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('gaming', 'All about video games.', 3);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('music', 'Share and discuss your favorite music.', 4);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('movies', 'Discuss your favorite movies and shows.', 5);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('books', 'Book recommendations and discussions.', 6);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('travel', 'Travel tips and experiences.', 1);
INSERT INTO topics ("name", "description", "creatorId") VALUES ('animal', 'Animal care and discussions.', 2);
```

## Posts

```
                                        Table "public.posts"
    Column    |           Type           | Collation | Nullable |              Default              
--------------+--------------------------+-----------+----------+-----------------------------------
 id           | integer                  |           | not null | nextval('posts_id_seq'::regclass)
 title        | character varying(255)   |           | not null | 
 content      | text                     |           | not null | 
 createdAt    | timestamp with time zone |           | not null | now()
 topicLocalId | integer                  |           | not null | 
 authorId     | integer                  |           |          | 
 topicId      | integer                  |           |          | 
 viewCount    | integer                  |           | not null | 0
 ip           | character varying(15)    |           |          | 
```

```sql
-- Dummy data for posts
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Introduction to Python', 'Python is a versatile programming language.', 1, 1, 1);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Introduction to JavaScript', 'JavaScript is essential for web development.', 2, 1, 1);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Understanding HTML and CSS', 'HTML and CSS are the backbone of web design.', 3, 3, 1);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Getting Started with SQL', 'SQL is a standard language for accessing databases.', 4, 4, 1);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('My Cat Journey', 'Sharing my experiences with my cat.', 5, 5, 8);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Traveling to Japan', 'Japan is a beautiful country with rich culture.', 6, 6, 7);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('The Future of AI', 'AI is transforming industries and lives.', 7, 2, 2);
INSERT INTO posts ("title", "content", "topicLocalId", "authorId", "topicId") VALUES ('Top 10 Video Games of 2023', 'Here are the top video games of 2023.', 8, 3, 3);
```
## Comments

```
                                      Table "public.comments"
  Column   |           Type           | Collation | Nullable |               Default                
-----------+--------------------------+-----------+----------+--------------------------------------
 id        | integer                  |           | not null | nextval('comments_id_seq'::regclass)
 content   | text                     |           | not null | 
 createdAt | timestamp with time zone |           | not null | now()
 postId    | integer                  |           |          | 
 userId    | integer                  |           |          | 
```

```sql
-- Dummy data for comments
INSERT INTO comments ("content", "postId", "userId") VALUES ('Great post! I love Python.', 1, 1);
INSERT INTO comments ("content", "postId", "userId") VALUES ('JavaScript is indeed essential for web development.', 2, 2);
INSERT INTO comments ("content", "postId", "userId") VALUES ('HTML and CSS are the foundation of web design.', 3, 3);
INSERT INTO comments ("content", "postId", "userId") VALUES ('SQL is powerful for data management.', 4, 4);
INSERT INTO comments ("content", "postId", "userId") VALUES ('I love my cat too! They bring so much joy.', 5, 5);
INSERT INTO comments ("content", "postId", "userId") VALUES ('Japan is on my travel bucket list!', 6, 6);
INSERT INTO comments ("content", "postId", "userId") VALUES ('AI is indeed the future. Exciting times ahead!', 7, 2);
INSERT INTO comments ("content", "postId", "userId") VALUES ('I can t wait to play the top games of 2023.', 8, 3);
INSERT INTO comments ("content", "postId", "userId") VALUES ('This is a great introduction to Python!', 1, 4);
INSERT INTO comments ("content", "postId", "userId") VALUES ('I agree, JavaScript is crucial for modern web apps.', 2, 5);
INSERT INTO comments ("content", "postId", "userId") VALUES ('CSS makes everything look better!', 3, 6);
INSERT INTO comments ("content", "postId", "userId") VALUES ('SQL is a must-know for data analysts.', 4, 1);
INSERT INTO comments ("content", "postId", "userId") VALUES ('Cats are the best companions!', 5, 5);
```
