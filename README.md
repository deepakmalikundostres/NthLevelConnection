# NthLevelConnection
This Project Contain How we can fetch the NthLevelConnection for a User 

To gererate the sample data for users
   run ``` node generateSampleData.js ```
   
To fetch nth level 
   run ``` http://localhost:3000/users/{user_id}/friends/{level}```
   
To fetch allUsers details
   run ```http://localhost:3000/users/fetchAllUsers```
   
Algorithm for fetching nth level 
   ```
  The findNthLevelFriends function takes two parameters: userId (the starting user ID) and desiredLevel (the desired level of friends to find). 
  It initializes an empty array called nthLevelFriends to store the friends at the desired level.
  A set called visited is created to keep track of visited users. This ensures that we don't revisit users and get stuck in an infinite loop.
  An empty queue is created to perform a breadth-first search. Each element in the queue represents a user and their current level in the search.
  The initial user, identified by userId, is added to the queue with a level of 0. The user is also marked as visited by adding them to the visited set.
  The algorithm enters a while loop, which continues until the queue becomes empty.
  Inside the loop, the first element in the queue is dequeued, extracting the userId and level information.
  If the current level matches the desiredLevel, the userId is added to the nthLevelFriends array and the loop continues to the next iteration.
  If the level is not the desiredLevel, the algorithm proceeds to retrieve the user's information from the database. The findOne method is used on the User model to find the user with the specified id and select only the blogs field.
  The algorithm iterates over the blogsForAboveUser array, which contains the blogs associated with the current user.
  For each blog, the algorithm retrieves the distinct user IDs (friendId) who have commented on that blog using the distinct method on the Comment model. The query filters comments based on the blogId.
  For each friendId, the algorithm checks if the friend has not been visited before. If the friend is new, the friend's ID is added to the visited set to mark it as visited, and the friend is added to the queue with an incremented level.
  After the while loop finishes, the nthLevelFriends array contains the IDs of friends at the desired level. It is then returned as the result of the function.```
 
Time Complexity
```Overall, the time complexity of the function can be approximated as O(N + M), where N is the total number of users and M is the average number of comments per blog.```
  

