// "use client";

import style from './signup.module.css';
import {redirect, useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import BackButton from './BackButton';

export default function SignupModal() {

  const formAction = async (formData:FormData)=>{

    "use server";
    // 이렇게 검증해주는게좋음
    if(!formData.get('id')){
      return {message:'no id'}
    }
    let shoudRedirect =false;
    try {
      // const response = await fetch(`http://localhost:9090/api/users`,{
      //   method:'post',
      //   body:formData,
      //   credentials:'include'
      // })
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,{
        method:'post',
        body:formData,
        credentials:'include'
      })
      console.log('res',response.status)
      // 이미 있는 회원이 또.. 가입
      if(response.status === 403){
        return {message:'user_exists'}
      }
      shoudRedirect = true
    } catch (err) {
      console.log(err)
      return
    }

    if(shoudRedirect){
      // trycatch안에서 사용 안됨
      redirect('/home')
    }
  }

  return (
    <>
       <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" name="id" className={style.input} type="text" placeholder=""
                     required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" name="name" className={style.input} type="text" placeholder=""
                    required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" name="password" className={style.input} type="password" placeholder=""
                     required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input id="image" name="image" required className={style.input} type="file" accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              {/* <button type="submit" className={style.actionButton} disabled={pending}>가입하기</button> */}
              <button type="submit" className={style.actionButton} >가입하기</button>
              {/* <div className={style.error}>{showMessage(state?.message)}</div> */}
            </div>
          </form>
        </div>
      </div>
    </>)
}