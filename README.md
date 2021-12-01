# SimpleOJ_Project

Đây là project được làm trong kì intern 

## Version 

1.0 (Phiên bản beta)

## Required 

* Themis: Tải themis tại [đây](https://dsapblog.wordpress.com/2013/12/24/themis/) 
* Virtualenv: 
```
pip install virtualenv
```
* npm: Tải npm tại [đây](https://www.npmjs.com/package/download) 
* MySQL: Tải MySQL Server tại [đây](https://dev.mysql.com/downloads/installer/)  

## Cài đặt 

### Cài đặt server (Cho Window)

1. Mở cmd truy cập vào đường dẫn của project servser
```
$ cd path_to_project/server 
```
2. Tạo môi trường ảo:
```
$ venv env 
```
3. Kích hoạt môi trường ảo:
```
$ env\Scripts\activate 
```
4. Cài đặt các gói trong môi trường được lưu trong file requirement:
```
$ pip install path_to_project/server/requirement.txt
```
5. Cài đặt database

Tạo 1 database mới và chỉnh sửa lại config kết nối database từ server trong file ```settings.py```

Chạy các câu lệnh sau để import database:
```
$ python manage.py makemigrations
$ python manage.py migrate
```
