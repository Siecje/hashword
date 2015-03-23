# Hashword

A password manager that allows you to only remember one 'master' password that is combined with a keyword and hashed for a unique password.

For example you can use the **Password Key** ```Googlepoweudsjdf``` with your one password to remember ```mylongandsupersecretpassword``` to get a password to use ```!7C0fa87fbf9c4ed65c41cd1fccca9ed4d0116bcbd7f206d87208ace609d21a0e``` when you log into Google.

The extra characters after Google are used for security if your master password is known. Which you must assume when a website is hacked. Hashword will automatically remember **Password Keys**.

It is not recommended to use Hashword for your email password in case you are without Hashword and need to reset a password.

##How does it work

The Password Key and the **Master Password** are combined (concatenated) and hashed using SHA256. A '!' is added to the beginning to fulfil the special character requirement of some websites. Then the first letter is capitalized to fulfill the need to have both uppercase and lowercase characters.

##Benefits

- One password to remember
- Unique secure (long) passwords for each site/service

##Drawbacks

- Have to be careful where you paste after you enter the password. You could consciously copy some text after you login.
- If your computer is compromised a portion of your passwords are known (the **Password Keys**). Even if a **Password Key** is known the resulting password must be verified with the site/service which has additional security such as rate limiting. One solution would be to require the master password initially and pre-populate the field so you just select the **Password Key**. However verifying the master password requires storing a hash of the **Master Password** which can be used to brute force the **Master Password**.

- If a password becomes known from a brute force attack using a compromised database. And the attacker knows that this method is used they will have your **Master Password** and only need to guess your **Password Keys**. And if your **Password Keys** all use the same pattern then it would be easy enough to get the password. A **Password Key** should have a unique portion.

##FAQ

###Why do you create a jibberish password? What about this [xkcd comic](https://xkcd.com/936/)?

The main problem is using the same password in multiple places. If a site database is compromised or a website does not hash your password then your password is known. If your email and username are also the same for multiple sites and services then they are compromised as well. Hashword allows you to remember one password but have unique passwords for different sites.

###Won't people just use "masterpassword" as the **Master Password**?

If someone knows you are using Hashword they could try a common passwords as the **Master Password** and common **Password Keys** such as the website name. Don't use a common or short password as the **Master Password**. An important principle of security is not to give people information. Even letting someone hear you type your password is extra information.

###What if I do not have access to Hashword and need to login?

If you don't know your **Password Key** but have access to your email you should reset your password. If you remember your **Password Key** with all the random characters you can manually generate your password with the SHA256 hash function. An app for Android that I recommend is Hash Droid. You need to select SHA256 and enter your **Password Key** and **Master Password** without a space in between them. Then add a '!' to the beginning of the result and capitalize the first letter of the result.

###Why not come up with a random password for each **Password Key** and require the **Password Master** to view them?

This would also require a central database to store the random passwords for each site in order to be accessible from multiple devices, which could become compromised.

###What is the best way to get my **Password Keys** on multiple devices?

The best way is to use the web version in Dropbox or a similar service. If you are using native versions to be able to quickly add the password to the clipboard you will need to manually add the **Password Keys**.

###What should I do when one of the websites I use was hacked?

Change the **Password Key** used for that site, and use the new generated password for that site.

###I use two factor authentication do I need Hashword?

If you use two factor authentication for everything you need to login to then you don't need to use Hashword. The problems is that not all sites support two factor authentication.
