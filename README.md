Simple Picasa
=========

Simple Picasa is a web app that displays Picasa Web Album's public phtot. Good for people who just want to see photos without distractions. Also good for those who are not comfortable with computers.
<br>

#### Demo: [linear-rig-499.appspot.com](https://linear-rig-499.appspot.com)


#### Info:  
- Using: Javascript, jQuery, FancyBox, Google App Engine (PHP)
- Configuration: By default, it shows my albums. To view your own albums, simply:  
  1. Go to the Profile Album of your Picasa Web. The web address should looks like this: ```picasaweb.google.com/{userid}/ProfilePhotos```  
  2. Copy the user id part
  3. Construct URL like this: ```linear-rig-499.appspot.com/?userid={userid}```  
  Simply replace the {userid} part with your user id  
  4. (Optional) By default, the full frame picture is 1200px wide. You can change it by constructing URL like this: ```linear-rig-499.appspot.com/?userid={userid}&fw={picture_width}```  
That's it!
<br>



