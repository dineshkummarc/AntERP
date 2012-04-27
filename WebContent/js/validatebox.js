/*
 *
 *
 */
var errFlag=0;
var errMsg = {
    required: {
        msg: "����ѡ��!",
        test: function(obj) {
            return obj.value.length > 0;
        }
    },
    urlDomain: {
        msg: "�������Ϸ�",
        test: function(obj) {
            return !obj.value || /^[^@-]+\.com(\.cn)?$/.test(obj.value);
        }
    },
    commonDomain: {
        msg: "�������Ϸ�",
        test: function(obj) {
            return !obj.value || /(^[A-Za-z0-9\u4e00-\u9fa5]+)((\-([A-Za-z0-9\u4e00-\u9fa5]+))?)(\.([A-Za-z0-9\u4e00-\u9fa5]+)((\-([A-Za-z0-9\u4e00-\u9fa5]+))?))+$/.test(obj.value);
        }
    },
    subDomain: {
        msg: "���������Ϸ�,�����ײ��ܰ���www.",
        test: function(obj) {
            return !obj.value || /^(?:(?!(www\.))([A-Za-z0-9\u4e00-\u9fa5]+)((\-([A-Za-z0-9\u4e00-\u9fa5]+))?))(\.([A-Za-z0-9\u4e00-\u9fa5]+)((\-([A-Za-z0-9\u4e00-\u9fa5]+))?))+$/.test(obj.value);
        }
    },
    wapDomian: {
    	msg: "WAP�������Ϸ�",
    	test: function(obj) {
            return !obj.value || /^([A-Za-z0-9])+\.?([A-Za-z0-9])+$/.test(obj.value);
        }
    },
    mastId:{
    	msg: "masId���Ϸ�",
      test: function(obj) {
            return !obj.value || /^M.{2}AH.{9}$/.test(obj.value);
    	}
    },
    masStandard:
    {
    	msg: "MAS��׼���벻�Ϸ�",
      test: function(obj) {
            return !obj.value || /^MAH\d{7}$/.test(obj.value);
    	}
    }, 
    mas06Standard:
    {
    	msg: "MAS��׼���벻�Ϸ�",
      test: function(obj) {
            return !obj.value || /^M06AH\d{9}$/.test(obj.value);
    	}
    }, 
    lineSpeed:
    {
    	msg: "�����Ϸ�",
      test: function(obj) {
            return !obj.value || /^[2468]$|^[1-9][02468]$|^1[0-4][02468]|^15[024]$/.test(obj.value);
    	}
    },
    scale:
    {
    	msg: "�������벻�Ϸ�",
      test: function(obj) {
          var objArr=obj.value.split(":");
          if(objArr.length==2 && parseInt(objArr[0])+parseInt(objArr[1])==100)
          {
            return !obj.value || /^([0-9]|[1-9][0-9]):([0-9]|[1-9][0-9])$/.test(obj.value);
          }else
          {
          	return false; 
          }
    	}
    },
    HHmm:{
    		msg:"ʱ���ʽΪHHmm",
    		test: function(obj) {
            return !obj.value || /^([0-1][0-9]|[2][0-3])[0-5][0-9]$/.test(obj.value);
        	}
    },
    shortNo:{
    		msg:"�̺Ÿ�ʽ��61-69��ͷ",
    		test: function(obj) {
            return !obj.value || /^[6][1-9]\d{4}$/.test(obj.value);
        	}
    },
    email: {
        msg: "�ʼ���ַ���Ϸ�",
        test: function(obj) {
            return !obj.value || /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(obj.value);
        }
    },
    dateFormat: {
        msg: "���ڸ�ʽMM/DD/YYYY",
        test: function(obj) {
            return !obj.value || /^\d{2}\/\d{2}\/\d{2,4}$/.test(obj.value);
            //��ʽ��MM/DD/YYYY	
        }
    },
    url: {
        msg: "��ַ���Ϸ�",
        test: function(obj) {
            return !obj.value || /([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}.*$/.test(obj.value);
        }
    },
    forMoney:{//vflag = 0 ����Ϊ����,vflag = -1 ����Ϊ����
    	msg: "�����ʽ����",
    	test:function(obj){
    		if(!obj.value) return true;
				var num = obj.value;
				var flag=obj.getAttribute("vflag");
				if(flag==null) flag=0;
				num.toString().replace(/\$|\,/g,'');
			
			
				if(isNaN(num))
				{
					errMsg.forMoney.msg="�����ʽ����";
					return false;
				}
			
				if(flag==0&&num<0)   
				{
					errMsg.forMoney.msg="����Ϊ����";// vflag = 0 ����Ϊ����
					return false;
				}
				if(flag==-1&&num>0)  
				{
					errMsg.forMoney.msg="����Ϊ����";//vflag = -1 ����Ϊ����
					return false;
				}
				obj.value=formatAsMoney(num);
				return true;
			//��ʽ�����
				function formatAsMoney(mnt) {
				    mnt -= 0;
				    mnt = (Math.round(mnt*100))/100;
				    return (mnt == Math.floor(mnt)) ? mnt + '.00'
				              : ( (mnt*10 == Math.floor(mnt*10)) ?
				                       mnt + '0' : mnt);
				}
			}
		},
    idCard: {
        msg: "����У�����", //["����λ������", "����������ڴ�����зǷ��ַ�", "����У�����", "�����Ƿ�"]
        test: function(obj) {
        		
            var idcard, Y, JYM;
            var S, M;
            var   aCity={11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",21:"����",22:"����",23:"������ ",31:"�Ϻ�",32:"����",33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",41:"����",42:"���� ",43:"����",44:"�㶫",45:"����",46:"����",50:"����",51:"�Ĵ�",52:"����",53:"����",54:"���� ",61:"����",62:"����",63:"�ຣ",64:"����",65:"***",71:"̨��",81:"���",82:"����",91:"���� ",99:"��Ϣ���� "}  
            idcard=obj.value = obj.value.replace(/(^\s*)|(\s*$)/g, "");
            if(!idcard) return true;
            if(aCity[parseInt(idcard.substr(0,2))]==null) {
                errMsg.idCard.msg = "�����Ƿ�";
                return false;
            }
	    	var idcard_array = new Array();
            idcard_array = idcard.split("");
            switch (idcard.length) {
            		case 0:
            			return true;
            			break;
                case 15:
                		var Ai=idcard.slice(0,6)+"19"+idcard.slice(6,16);
                    if (!/^\d+$/.test(Ai)){
                        errMsg.idCard.msg = "����������ڴ�����зǷ��ַ�";
                		return false;
                    }
					var yyyy=Ai.slice(6,10) ,  mm=Ai.slice(10,12)-1  ,  dd=Ai.slice(12,14);
					var d=new Date(yyyy,mm,dd) ,  now=new Date();
					var year=d.getFullYear() ,  mon=d.getMonth() , day=d.getDate();
					if (year!=yyyy || mon!=mm || day!=dd || d>now ){
                        errMsg.idCard.msg = "����������ڴ�����зǷ��ַ�";
                		return false;
                    }
					return true;
                    break;
                case 18:
                    //18λ��ݺ�����
                    //�������ڵĺϷ��Լ��
                    //��������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                    //ƽ������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}[12]\d[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //����������ڵĺϷ���������ʽ
                    }
                    else {
                        ereg = /^[1-9][0-9]{5}[12]\d[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //ƽ��������ڵĺϷ���������ʽ
                    }
                    if (ereg.test(idcard)) {
                        //���Գ������ڵĺϷ���
                        //����У��λ
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
											    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
											    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
											    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
											    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
											    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
											    + (parseInt(idcard_array[6])  + parseInt(idcard_array[16])) * 2
											    + parseInt(idcard_array[7]) * 1
											    + parseInt(idcard_array[8]) * 6
											    + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";
                        M = JYM.substr(Y, 1); //�ж�У��λ
                        if (idcard_array[17] == 'x')
                            idcard_array[17] = 'X';
						 if (M == idcard_array[17]) {
	                            	return true; //���ID��У��λ
	                        }else {
	                            	errMsg.idCard.msg = "����У�����";
	                            	return false;
	                        }
                    }
                    else {
                        errMsg.idCard.msg = "����������ڴ�����зǷ��ַ�";
                		return false;
                    }
                    break;
                default: 
                    errMsg.idCard.msg = "����λ������";
                	return false;
             }

        }
    },
	c_idCard: {
        msg: "����У�����",
        test: function(obj) {	
            idcard=obj.value = obj.value.replace(/(^\s*)|(\s*$)/g, "");
	    	var idcard_array = new Array();
            idcard_array = idcard.split("");
            switch (idcard.length) {
            	case 0:
            			return true;
            			break;
                case 15:
                		var Ai=idcard.slice(0,6)+"19"+idcard.slice(6,16);
                    	if (!/^\d+$/.test(Ai))  return 1;
						var yyyy=Ai.slice(6,10) ,  mm=Ai.slice(10,12)-1  ,  dd=Ai.slice(12,14);
						var d=new Date(yyyy,mm,dd) ,  now=new Date();
						var year=d.getFullYear() ,  mon=d.getMonth() , day=d.getDate();
						if (year!=yyyy || mon!=mm || day!=dd || d>now ){
						    errMsg.c_idCard.msg = "����������ڴ�����зǷ��ַ�";
                			return false;
						}
						return true;
                    break;
                case 18:
                    //18λ��ݺ�����
                    //�������ڵĺϷ��Լ��
                    //��������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                    //ƽ������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}[12]\d[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //����������ڵĺϷ���������ʽ
                    }
                    else {
                        ereg = /^[1-9][0-9]{5}[12]\d[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //ƽ��������ڵĺϷ���������ʽ
                    }
                    if (ereg.test(idcard)) {
                        //���Գ������ڵĺϷ���
                        return true;
                    }else
                    	errMsg.c_idCard.msg = "����������ڴ�����зǷ��ַ�";
                		return false;
                    break;
                default:
                    errMsg.c_idCard.msg = "����λ������";
                	return false;
            }

        }
    },
    upLetter: {
        msg: "����Ϊ��дӢ����ĸ",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[A-Z]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                //obj.select();
                return false;
            }
            return true;
        }
    },
    lowLetter: {
        msg: "����ΪСдӢ����ĸ",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[a-z]+$/
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    allLetter: {
        msg: "����ΪӢ��",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[A-Za-z]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    numOrLetter: {
        msg: "����ΪӢ�Ļ�����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[A-Za-z0-9]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
   englishName: {
        msg: "����ΪӢ��,����,�»��߻��߿ո�",
        test: function(obj) {
        		if(!obj.value) return true;
        	if(obj.value.trim()=="")return false;
            var patrn = /^[A-Za-z0-9_\s]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },

    
     numAndLetter:{
	  	 msg: "����Ϊ���ֺ���ĸ�Ļ��",
	      test: function(obj) {
	      		if(!obj.value) return true;
	          var sInput = obj.value;
	          if (sInput&&(!(/^([a-zA-Z]|[0-9]){0,}$/.test(sInput)&&/[a-zA-Z]{1}/.test(sInput)&&/\d{1}/.test(sInput)))) {
                return false;
            }
	          return true;
	      }
  	
  	},
    numLetterChinese: {
        msg: "����ΪӢ��,���ֻ���",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
      numLetterChineseLineation: {
        msg: "����ΪӢ��,���ֻ���-",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[A-Za-z0-9\u4e00-\u9fa5\-]+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    postCode: {
        msg: "���������ʽ����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[0-9]{1}(\d){5}$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    commonPhone: {//У����ͨ�绰��������룺���ԡ�+����ͷ���������⣬�ɺ��С�-��
        msg: "�绰�����ʽ����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[+]{0,1}((0(\d{2}))?([-]{0,1})([1-9]\d{7})|(0(\d{3}))?([-]{0,1})([1-9]\d{6,7}))$/;
            var sInput = obj.value;
            if (obj.value && sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    andCellphone: {//У���ֻ����̻���������룺���ԡ�+����ͷ���������⣬�ɺ��С�-��
        msg: "�绰�����ʽ����",
        test: function(obj) {
        		if(!obj.value) return true;
           	var patrn = /^[+]{0,1}(\d{3,4})?([-]{0,1})?(\d{7,8})$/;
           	//var patrn = /^[+]{0,1}(\d{3,4})([-])?(\d{7,8})$/;   //�������Ƴ��ȣ����޸�Ϊ����
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    andfaxNbr: {//У���ֻ����̻���������룺���ԡ�+����ͷ���������⣬�ɺ��С�-��
        msg: "��������ʽ����",
        test: function(obj) {
        		if(!obj.value) return true;
           	var patrn = /^[+]{0,1}(\d{3,4})?([-]{0,1})?(\d{7,8})$/;
           	//var patrn = /^[+]{0,1}(\d{3,4})([-])?(\d{7,8})$/;   //�������Ƴ��ȣ����޸�Ϊ����
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    cellPhone: {//�������
        msg: "��������ʽ����",
        test: function(obj) {
        	 if(!obj.value) return true;
        	 var patrn=/^[^\u4e00-\u9fa5]{0,}$/;
          // var patrn = /^((\(\d{3}\))|(\d{3}\-))?[12][0358]\d{9}$/;
           // var patrn = /^1[358][39]\d{8}$/;//����
          //var patrn = /^1[35][0126]\d{8}$/;//��ͨ
          //var patrn = /^1[358][4-9]\d{8}$/;//�ƶ�
            var sInput = obj.value;
            if (sInput.search(patrn)==-1) {
                return false;
            }
            return true;
        }
    },
    allCellPhone:{//ԭ�ֻ�������֤
    	 msg: "�ֻ������ʽ����",
        test: function(obj) {
        	if(!obj.value) return true;
          var patrn = /^((\(\d{3}\))|(\d{3}\-))?[12][0358]\d{9}$/;
           // var patrn = /^1[358][39]\d{8}$/;//����
          //var patrn = /^1[35][0126]\d{8}$/;//��ͨ
          //var patrn = /^1[358][4-9]\d{8}$/;//�ƶ�
            var sInput = obj.value;
            if (sInput.search(patrn)==-1) {
                return false;
            }
            return true;
        }
    	},
    forTelecom: {//����
        msg: "���ǵ����ֻ�����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^1[358][39]\d{8}$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    forUnicom: {//��ͨ
        msg: "������ͨ�ֻ�����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^1[35][0126]\d{8}$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    forMobile: {//�ƶ�
        msg: "�����ƶ��ֻ�����",
        test: function(obj) {
        		if(!obj.value) return true;
           // var patrn = /^1[358][4-9]\d{8}$/;         
            //var patrn = /^1(3[4-9]|47|5[012789]|8[7-8])\d{8}$/;
            var patrn = /^\d{11}$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    ipAddress: {
        msg: "IP��ַ����",
        test: function(obj) {
        		if(!obj.value) return true;
            //var pattern = /^(\d{1,2}|1\d\d|1\d?\*|2[0-4][\d*]|2\*|25[0-5]|25\*)(\.(\d{1,2}|1\d\d|1\d?\*|2[0-4][\d*]|2\*|25[0-5]|25\*)){3}$/;
             var pattern = /^([1-9]|[1-9]\d|(1[0-1|3-9]\d|12[0-6|8-9]|2[0-3]\d|24[0-7]))(\.(\d|[1-9]\d|(1\d{2}|2([0-4]\d|5[0-5])))){3}$/;
            var sInput = obj.value;
            if (sInput.search(pattern) == -1) {
                return false;
            }
            return true;
        }
    },
    num_letter: {
        msg: "����Ϊ����,Ӣ�ĺ��»���",
        test: function(obj) {
        	if(!obj.value) return true;
            var patrn = /^\w+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    isSizeOf: {//��Ҫ�Զ�������v_maxlength,v_minlength
        msg: "��ֵ��������",
        test: function(obj) {
        		if(!obj.value) return true;
            var maxval = parseFloat(obj.getAttribute("v_maxlength"));
            var minval = parseFloat(obj.getAttribute("v_minlength"));
            //var selval = parseFloat(obj.value);
            if (isNaN(obj.value)) {
                errMsg.isSizeOf.msg = "����Ϊ����";
                return false;
            }else{
            	var selval = parseFloat(obj.value);
            }
						var flag = obj.getAttribute("v_flag");
						if(typeof(flag) == "undefined" || flag == "" || flag==null)	flag = "TT" ;
						var lflag = flag.substring(0,1);//flag.split("|")[0];
						var rflag = flag.substring(1,2);//flag.split("|")[1];
			
            if (!isNaN(maxval)) {
            	if(rflag == "T"){
	                if (selval > maxval) {
	                    errMsg.isSizeOf.msg = "��ֵ��С����ָ����Χ��";
                		return false;
	                }
              }else{
	              	if (selval >= maxval) {
	                    errMsg.isSizeOf.msg = "��ֵ��С����ָ����Χ��";
                		return false;	
	              	}
            	}
            }
            
            if (!isNaN(minval)) {
	           	if(lflag == "T"){
	                if (selval < minval) {
	                    errMsg.isSizeOf.msg = "��ֵ��С����ָ����Χ��";
                		return false;
	                }
	           	}else {
	           		if (selval <= minval) {
	                   	errMsg.isSizeOf.msg = "��ֵ��С����ָ����Χ��";
                		return false;
	               	}	
	           	}
         	}	
            return true;
        }
    },
     isDigLengthOf:{//��ֵ��λ��,��Ҫ�Զ�������v_maxlength,v_minlength
    	 		msg: "��ֵ��������",
        	test: function(obj) {
        			if(!obj.value) return true;
        			var maxlen = parseFloat(obj.getAttribute("v_maxlength"));
	            var minlen = parseFloat(obj.getAttribute("v_minlength"));
	            var reg = new RegExp("\\s","gi");
	            var val=obj.value.replace(reg, "");
	
	            if (isNaN(obj.value)&&obj.value!="") {
	                errMsg.isDigLengthOf.msg = "����Ϊ����";
                	return false;
	            }
	            if (!isNaN(maxlen)) {
	                if ((val+"").length > maxlen) {
	                    errMsg.isDigLengthOf.msg = "��ֵλ������ָ����Χ��";
                		return false;
	                }
	            }
	            if (!isNaN(minlen)) {
	                if ((val+"").length < minlen) {
	                    errMsg.isDigLengthOf.msg = "��ֵλ������ָ����Χ��";
                		return false;
	                }
	            }
	            return true;
	        }
    	},
    isLengthOf: {//��Ҫ�Զ�������v_maxlength,v_minlength
        msg: "���Ȳ���ָ����Χ��",
        test: function(obj) {
        		if(!obj.value) return true;
            var maxlen = parseFloat(obj.getAttribute("v_maxlength"));
            var minlen = parseFloat(obj.getAttribute("v_minlength"));
            //var val=obj.value.replace(/(^\s*)|(\s*$)/g, "");
            var val=obj.value;
            if (!isNaN(maxlen)) {
                if ((val+"").len() > maxlen) {
                    return false;
                }
            }
            if (!isNaN(minlen)) {
                if ((val+"").len() < minlen) {
                    return false;
                }
            }
            return true;
        }
    },
     byteSize:{
        msg:"�������ݵ��ֽڳ��Ȳ���",
        test:function(obj){
            if(!obj.value) return true;
            var maxlen = parseFloat(obj.getAttribute("v_maxlength"));
            var minlen = parseFloat(obj.getAttribute("v_minlength"));
            var val=obj.value.replace(/(^\s*)|(\s*$)/g, "");
            var cArr = val.match(/[^\x00-\xff]/ig);  
            var byteLen=val.length + (cArr == null ? 0 : cArr.length);  
             if (!isNaN(maxlen)) {
                if (byteLen > maxlen) {
                    return false;
                }
            }
            if (!isNaN(minlen)) {
                if (byteLen < minlen) {
                    return false;
                }
            }
            return true;
        }
    },
    samePW:{
        msg:"���벻һ�£�����������",
        test:function(obj)
        {
        	var pw = document.getElementById(obj.getAttribute("v_pw"));
    		var confirmPw = document.getElementById(obj.getAttribute("v_confirmPw"));
    		if(pw.value!=""&&confirmPw.value!=""&&pw.value != confirmPw.value){
    			return false;
    		}else if(pw.value!=""&&confirmPw.value!=""&&pw.value==confirmPw.value){
    			if(pw.parentNode&&pw.parentNode.errstate)
                {
                    hideErrors(pw);
                    pw.parentNode.removeAttribute("errstate");
                } 
                if(confirmPw.parentNode&&confirmPw.parentNode.errstate)
                {
                    hideErrors(confirmPw);
                    confirmPw.parentNode.removeAttribute("errstate");
                } 
                return true;
    		}
    		return true; 
        }
    },
    posInt: {
        msg: "������������",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[0-9]*[1-9][0-9]*$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    forInt: {
        msg: "����Ϊ����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^-?\d+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    nonNegInt: {
        msg: "����Ϊ�Ǹ�����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^\d+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    negInt: {
        msg: "����Ϊ��������",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^-[0-9]*[1-9][0-9]*$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    notNegReal: {
        msg: "����Ϊ�Ǹ�ʵ����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[0-9]+((\.{1}?[0-9]{1,13})|(\.{0}?[0-9]{0}))?$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    //add by liaomin 2011.10.31
    notNegReal1: {
        msg: "�޶�ֵ���Ϸ���",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^[0-9]+((\.{1}?[0-9]{1,13})|(\.{0}?[0-9]{0}))?$/;
            var sInput = obj.value;
           	if (sInput.search(patrn) == -1) {
                return false;
            }
            if (sInput.substring(0,1)==="0") {
                return false;
            }
            if(sInput.substring(0,1)==="."){
            	return false;
            }
            return true;
        }
    },
        //add by liaomin 2011.10.31
    notNegReal2: {
        msg: "С���������λ��",
        test: function(obj) {
        	if(!obj.value) return true;
            var sInput = obj.value;
            if(sInput.indexOf(".")>-1){//�����С����
            	 var i = sInput.indexOf(".");
            	 var subInput = sInput.substring(i+1,sInput.length);
            	 if(subInput.length==0){
            		 return false;
            	 }
            	 if(subInput.length>2){
            		 return false;
            	 }
            }
            return true;
        }
    },
    forReal: {
        msg: "����Ϊʵ����",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^([-]{0,1})?[0-9]+((\.{1}?[0-9]{1,13})|(\.{0}?[0-9]{0}))?$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            return true;
        }
    },
    uploadFile: {//��֤�ϴ��ļ���ʽ����Ҫ�Զ�������v_upType
        msg: "�ϴ����ļ�����",
        test: function(obj) {
        		if(!obj.value) return true;
            var fileName = obj.value.replace(/^\s*/, "").replace(/\s*$/, "");
            if (fileName == "") {
                errMsg.uploadFile.msg = "��ѡ��Ҫ�ϴ����ļ�";
                return false;
            }
            else {
                var pos = fileName.lastIndexOf(".");
                if (pos != -1) {
                    var suf = fileName.substring(pos + 1, fileName.length).toLowerCase();
                    var upType = obj.getAttribute("v_upType").split(",");
                    for (var i = 0; i < upType.length; i++) {
                        if (upType[i] == suf) {
                            return true;
                        }
                    }
                };
                errMsg.uploadFile.msg = "���ϴ���׺����ȷ���ļ�";
                return false;
            }
            return true;
        }
    },
     compareDate : {
    	msg: "�������ڱȿ�ʼ������",
    	test: function(obj){
    		var frontDate = document.getElementById(obj.getAttribute("v_extB"));
    		var behindDate = document.getElementById(obj.getAttribute("v_extE"));
    		if(frontDate.value!=""&&behindDate.value!=""&&frontDate.value > behindDate.value){
    			return false;
    		}
    		return true;
    	}
    },
    yyyy:{//yyyy
    	msg:"���ڸ�ʽΪyyyy",
    	test:function(obj){
    			if(!obj.value) return true;
    			if(getDateFromFormat(obj.value,"yyyy")==0)
    					return false;
    			return true;
    		} 	
    	},
    HHmmss:{//HHmmss
    	msg:"���ڸ�ʽΪHHmmss",
    	test:function(obj){
    			if(!obj.value) return true;
    			if(getDateFromFormat(obj.value,"HHmmss")==0)
    					return false;
    			return true;
    		} 	
    	},
    yyyyMMddHHmmss:{//yyyyMMddHHmmss
    	msg:"���ڸ�ʽΪyyyyMMddHHmmss",
    	test:function(obj){
    			if(!obj.value) return true;
    			if(getDateFromFormat(obj.value,"yyyyMMddHHmmss")==0)
    					return false;
    			return true;
    		} 	
    	},
  	speyyyyMMddHHmmss:{//yyyyMMddHHmmss
  	msg:"���ڸ�ʽΪyyyyMMdd HH:mm:ss",
  	test:function(obj){
  			if(getDateFromFormat(obj.value,"yyyyMMdd HH:mm:ss")==0)
  					return false;
  			return true;
  		} 	
  	},
    MM:{//MM
    	msg:"���ڸ�ʽΪMM",
    	test:function(obj){
    			if(!obj.value) return true;
    			if(getDateFromFormat(obj.value,"MM")==0)
    					return false;
    			return true;
    		} 	
    	},
    dd:{//dd
    	msg:"���ڸ�ʽΪdd",
    	test:function(obj){
    			if(!obj.value) return true;
    			if(getDateFromFormat(obj.value,"dd")==0)
    					return false;
    			return true;
    		} 	
    	},
  	yyyyMMdd:{
  		msg:"���ڸ�ʽΪyyyyMMdd",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"yyyyMMdd")==0)
  					return false;
  			return true;
  		} 	
  	},
  	yyyyMM:{
  		msg:"���ڸ�ʽΪyyyyMM",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"yyyyMM")==0)
  					return false;
  			return true;
  		} 		
  	},
  	yyyyMMddHH:{
  		msg:"���ڸ�ʽΪyyyyMMddHH",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"yyyyMMddHH")==0)
  					return false;
  			return true;
  		}	
  	},
  	"lineyyyyMMdd":{
  		msg:"���ڸ�ʽΪyyyy-MM-dd",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"yyyy-MM-dd")==0)
  					return false;
  			return true;
  		}	
  	},
  	"ColonHHmmss":{
  		msg:"���ڸ�ʽΪHH:mm:ss",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"HH:mm:ss")==0)
  					return false;
  			return true;
  		}	
  	},
  	"lineyyyyMMddHHmmss":{
  		msg:"��ʽΪyyyy-MM-dd HH:mm:ss",
  		test:function(obj){
  			if(!obj.value) return true;
  			if(getDateFromFormat(obj.value,"yyyy-MM-dd HH:mm:ss")==0)
  					return false;
  			return true;
  		}	
  	},
  	moneyFormat:{
  		msg:"����Ϊ��0��2λС������ֵ",
  		test:function(obj){
				var objValue=obj.value;
  			if(!objValue) return true;
				if(isNaN(objValue)) return false;
  			var mArr=(objValue+"").split(".");
				if(mArr.length>1){
						if(mArr[1].length==0||mArr[1].length>2) return false;
					}
  			return true;

  		}	

  	},
  	multiMoneyFormat:{
  		msg:"��������",
  		test:function(obj){
				var objValue=obj.value;
				var decNum = obj.getAttribute("v_decNum");
	  		if(!objValue) return true;
				if(isNaN(objValue)){
				    errMsg.multiMoneyFormat.msg = "����ΪС��";
                	return false;
				}
				if(objValue.indexOf("\.")==-1){
				    errMsg.multiMoneyFormat.msg = "����ΪС��";
                	return false;
				}
	  		var mArr=(objValue+"").split(".");
				if(mArr.length>1){
					if(mArr[1].length!=decNum) {
					    errMsg.multiMoneyFormat.msg = "С�����λ������";
              				return false;
					}
				}
	  			return true;
	  		}	
  	},
  	haveSpe:{
			msg:"��������\\ / < > \' \" & #���ַ�",
			test:function(obj)
			{
				if(!obj.value) return true;
				return haveSpe(obj.value);
				function haveSpe(str)
				{
				  var comp="\\/><\'\"&#";
				  var aChar="";
				  for(var i=0;i<str.length;i++)
				  {
					aChar=str.charAt(i);  
					if(comp.indexOf(aChar)!=-1)
						return false;
				  }
				  return true;
				}
			}
		},
      haveSpeForAll:{   //�����е��ı����������
			msg:"��������\\ < > \' \" & # %*?���ַ�",
			test:function(obj)
			{
				if(!obj.value) return true;
				return haveSpe(obj.value);
				function haveSpe(str)
				{
				  var comp="\\><\'\"&#%*?";
				  var aChar="";
				  for(var i=0;i<str.length;i++)
				  {
					aChar=str.charAt(i);  
					if(comp.indexOf(aChar)!=-1)
						return false;
				  }
				  return true;
				}
			}
		},
	for0_9:{
		msg:"�������������",
		test:function(obj)
			{
				if(!obj.value) return true;
				var numStr="0123456789";
				if(obj.value.length==0)
					return false;
				if (!isMadeOf(obj.value,numStr))
					return false;
				return true;
				function isMadeOf(val,str)
				{
				
					var jj;
					var chr;
					for (jj=0;jj<val.length;++jj){
						chr=val.charAt(jj);
						if (str.indexOf(chr,0)==-1)
							return false;			
					}
					
					return true;
				}
			}
		},
	isServ:{
 		msg:"�����Ϸ������Ƹ�ʽ",
 		test: function(obj) {
        if(!obj.value) return true;
 				var patrn=/^[s]{1}([0-9]|[a-zA-Z]){0,}$/;
 				var sInput=obj.value;
 				if(!patrn.exec(sInput)) return false;
 				return true;
 		}
 	},
 	nonNegZInt: {
        msg: "����Ϊ���������",
        test: function(obj) {
        		if(!obj.value) return true;
            var patrn = /^\d+$/;
            var sInput = obj.value;
            if (sInput.search(patrn) == -1) {
                return false;
            }
            if (obj.value.length > 1)
            {
	            if (obj.value.substring(0,1) == '0')
	            {
	            	return false;
	            }
            }
            return true;
        }
    }
}

	function hideErrors(elem) {
	   var box=$(elem);
	   if(box.hasClass("validatebox-invalid")){
			box.removeClass("validatebox-invalid");
	   }
	   hideTip(elem);
	   errFlag--;
	}
	function showErrors(elem, errors) {
		
		var box=$(elem);
		box.addClass("validatebox-invalid");
		//validMsgs[elem.name+"validatebox"]	= errors;
	    if(typeof($.data(elem,'validatebox'))=="undefined"){
	    	$.data(elem,"validatebox",{});
	    }
	    $.data(elem,'validatebox').message=errors;
	    
	    showTip(elem);
	    errFlag++;
	}
	function hideTip(elem) {
	 //var tip=validDatas[elem.name+"validatebox"];
	 if(typeof($.data(elem,'validatebox'))=="undefined"){
	 	$.data(elem,"validatebox",{});
	 }
	 var tip = $.data(elem,'validatebox').tip;
	 if(tip){
		 tip.remove();
		 //validDatas[elem.name+"validatebox"] = null;
		 $.data(elem,'validatebox').tip = null;
	 }
	}
	function showTip(elem) {
		var box=$(elem);  
		//var tip=validDatas[elem.name+"validatebox"];
		//var msg = validMsgs[elem.name+"validatebox"];
		var tip = $.data(elem,'validatebox').tip;
		var msg = $.data(elem,'validatebox').message;
		if(!tip){
			tip=$("<div class=\"validatebox-tip\" onmouseover=\"$(this).hide();\">"+"<span class=\"validatebox-tip-content\">"+"</span>"+"<span class=\"validatebox-tip-pointer\">"+"</span>"+"</div>").appendTo(box.parent());
			//validDatas[elem.name+"validatebox"]	= tip;
			$.data(elem,'validatebox').tip=tip;
		}			
		tip.find(".validatebox-tip-content").html(msg);	   
		tip.css({display:"block","line-height":"12px",left:box.offset().left+box.outerWidth(),top:box.offset().top});
	}
	function validateField(elem) {
	    for (var name in errMsg) {
	        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
	        if (re.test(elem.className)) {
	            var state = errMsg[name].test(elem);
	            if (typeof errMsg[name].msg == 'string' && !state) {
	            		if(elem.id!=""){elem.parentNode.errstate=elem.id}
	            		else{elem.id=(new Date).getTime();elem.parentNode.errstate=elem.id}
	                showErrors(elem, errMsg[name].msg);
	                break;
	            }
	            else if ((errMsg[name].msg.constructor === Array) && (state !== true)) {
	            		if(elem.id!=""){elem.parentNode.errstate=elem.id}
	            		else{elem.id=(new Date).getTime();elem.parentNode.errstate=elem.id}
	                showErrors(elem, errMsg[name].msg[state]);
	                break;
	            }
	            else {
	            		if(elem.parentNode&&elem.parentNode.errstate&&(elem.id==elem.parentNode.errstate||!document.getElementById(elem.parentNode.errstate)||document.getElementById(elem.parentNode.errstate).style.display=='none'||document.getElementById(elem.parentNode.errstate).style.visibility=='hidden'))
	            		{
	                	hideErrors(elem);
	                	elem.parentNode.removeAttribute("errstate");
	              }
	            };
	        }
	    }
	}
	function validateElement(elem) {
	    if(typeof elem == 'string'){
	        elem = document.getElementById(elem);
	    }
	    for (var name in errMsg) {
	        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
	        if (re.test(elem.className)) {
	            var state = errMsg[name].test(elem);
	            if (typeof errMsg[name].msg == 'string' && !state) {
	            		if(elem.id!=""){elem.parentNode.errstate=elem.id}
	            		else{elem.id=(new Date).getTime();elem.parentNode.errstate=elem.id}
	                showErrors(elem, errMsg[name].msg);
	                return false;
	            }
	            else if ((errMsg[name].msg.constructor === Array) && (state !== true)) {
	            		if(elem.id!=""){elem.parentNode.errstate=elem.id}
	            		else{elem.id=(new Date).getTime();elem.parentNode.errstate=elem.id}
	                showErrors(elem, errMsg[name].msg[state]);
	                return false;  
	            }
	            else {
	            		if(elem.parentNode&&elem.parentNode.errstate&&elem.id==elem.parentNode.errstate)
	            		{
	                	hideErrors(elem);
	                	elem.parentNode.removeAttribute("errstate");
	              }
	            };
	        }
	    }
	    return true;
	}
	
	function validateElements(elem){
		$(".validatebox-invalid").removeClass("validatebox-invalid");
		if(typeof elem == 'string'){
	        elem = $("#"+elem);
	    }
		elem.find(":input").each(function(){
				var v_element=this;
		    	var v_display=0;
		    	while(v_element.parentNode&&v_element.parentNode.id!=elem.attr("id")&&v_element.parentNode.tagName!="BODY"){
		    		if(v_element.parentNode.style.display=="none"||v_element.style.display=="none"||v_element.type=="hidden"||v_element.parentNode.style.visibility=="hidden"||v_element.style.visibility=="hidden"){
				    	v_display++;
				    }
				    v_element=v_element.parentNode;
			     }
			     if(v_display!=0&&this.parentNode.errstate&&(this.parentNode.errstate==this.id)){
			      	  hideErrors(this);
			          this.parentNode.removeAttribute("errstate");
			      	
			     }
			 	 if(this.disabled==false&&v_display==0){
			 	 	 if(this.type=="text"){  //Ϊ�����ı�����������ַ�У��
	               		addClass(this,"haveSpeForAll");
	          		 }
					 validateField(this);
				 }
	        })
	    if($(".validatebox-invalid")[0]){
	    	try{
		    	$(".validatebox-invalid")[0].focus();
		    }catch(e){
		    	return false;
		    }
		    return false;
	    }else{
	        return true;
	    }
	}
	
	$(document).ready(function () {
	     $(":input").each(function(){
	           if(this.type=="text"){  //Ϊ�����ı�����������ַ�У��
	               addClass(this,"haveSpeForAll");
	           }
	           $.data(this,"validatebox",{});
		       $(this).bind("blur keyup",function(){validateField(this)})
		    
	    })
	});
	
	function checkAll(form){
	    for (var i = 0; i < form.elements.length; i++) {
	    	var v_element=form.elements[i];
	    	var v_display=0;
	    	while(v_element.parentNode&&v_element.parentNode.tagName!="FORM"&&v_element.parentNode.id!="operation_table")
	    	{
	    		if(v_element.parentNode.style.display=="none"||v_element.style.display=="none"||v_element.type=="hidden"||v_element.parentNode.style.visibility=="hidden"||v_element.style.visibility=="hidden")
		    		{
			    		v_display++;
			    	}
			    v_element=v_element.parentNode;
	      }
	      if(v_display!=0&&form.elements[i].parentNode.errstate&&(form.elements[i].parentNode.errstate==form.elements[i].id)){
	      						hideErrors(form.elements[i]);
	                	form.elements[i].parentNode.removeAttribute("errstate");
	      	
	      	}
			 	if(form.elements[i].disabled==false&&v_display==0)
				 	{
						 validateField(form.elements[i]);
					}
				else
					{
						//hideErrors(form.elements[i]);
					}
	    }
	    if($(".error_css")[0]){
	    	var preObj=$(".error_css")[0].previousSibling;
				while(preObj&&preObj.nodeType!=1){
				 	preObj=preObj.previousSibling;
				}
		    //preObj.focus();
		    //���㶨λ����һ��У��δͨ����Ԫ����
		    if(preObj&&(preObj.type=="text"||preObj.type=="textarea")){
						preObj.focus();
					}else{
						try{
								preObj.focus();
							}catch(e){}
					}
		  }
	}
	
	function checksubmit(form_01){
	    if(form_01){
	       errFlag=0;
	       if(typeof form_01 != 'string'){
	          checkAll(form_01); 
	       }else{
	          checkAll(document.getElementsByName(form_01)[0]); 
	       }
	       
	    }else{
	        $(":input").each(function(){
				var v_element=this;
		    	var v_display=0;
		    	while(v_element.parentNode&&v_element.parentNode.tagName!="BODY"){
		    		if(v_element.parentNode.style.display=="none"||v_element.style.display=="none"||v_element.type=="hidden"||v_element.parentNode.style.visibility=="hidden"||v_element.style.visibility=="hidden"){
				    	v_display++;
				    }
				    v_element=v_element.parentNode;
			     }
			     if(v_display!=0&&this.parentNode.errstate&&(this.parentNode.errstate==this.id)){
			      	  hideErrors(this);
			          this.parentNode.removeAttribute("errstate");
			      	
			     }
			 	 if(this.disabled==false&&v_display==0){
					 validateField(this);
				 }
	        })
	    }
	   
        if($(".validatebox-invalid")[0]){
		    $(".validatebox-invalid")[0].focus();
		    return false;
	    }else{
	        return true;
	    }
	    
	}
	
	function addClass(element,value){ //׷����ʽ���������滻��ʽ
		$(element).addClass(value);
	    /*var ename;
	    if (!element.className) {
	    	element.className = value;
	    	}else{
	    		var sname = element.className.split(" ");
	    		for(var i=0;i<sname.length;i++){
	    			if(sname[i].indexOf(value)==0){
	    				ename = sname[i];
	    			}	
	    		}
	    		if(!ename){
	    			element.className+= " ";
	      		element.className+= value;
	    		}
			}
		*/
	 }
	 
	 /*jquery begin*/
	 //��������Ԫ��У��
	 function reloadValidate(param){
	     
	     if(!param){ //����Ϊ�գ���֤����inputԪ��
	         $(":input").each(function(){
	         		if(this.type=="text"){  //Ϊ�����ı�����������ַ�У��
		               addClass(this,"haveSpeForAll");
		            }
	               $.data(this,"validatebox",{});
			       $(this).bind("change focus keyup",function(){validateField(this)})
			    })
	     }else{
		     if($('#'+param).attr("tagName")=='INPUT'){ //�����ض�Ԫ��
	     		if(this.type=="text"){  //Ϊ�����ı�����������ַ�У��
	               addClass(this,"haveSpeForAll");
	            }
		         $.data($('#'+param)[0],"validatebox",{});
		         $($('#'+param)[0]).bind("change focus keyup",function(){validateField(this)})
		         
		     }else{ //�������б�Ԫ��
		         var formname;
			     if(param.name){
			        formname = param.name;
			     }else{
			        formname = param;
			     }
			     $("form[name="+formname+"] :input").each(function(){
			     	if(this.type=="text"){  //Ϊ�����ı�����������ַ�У��
		               addClass(this,"haveSpeForAll");
		            }
			        $.data(this,"validatebox",{});
			        $(this).bind("change focus keyup",function(){validateField(this)})
			    })
		     }
	     } 
	 }
	 
	 function addJqClass(id,cls){ 
	    var element=document.getElementById(id);
	    addClass(element,cls);
	 }
	 
	function removeJqClass(id,cls) {
	    var element=document.getElementById(id);
	    if (hasJqClass(element,cls)) {
	        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	        element.className=element.className.replace(reg,' ').replace(/ {2,}/g,' ').replace(/(^\s*)|(\s*$)/g, '');//ȥ�����Ҳ�ո��Լ��������ֵĿո�
	    }
	}
	function hasJqClass(element,cls) { 
	    return element.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}
	/*jquery end*/
	
	
	
	
	 //��ҳ�����ı����ûҲ����õ�ʱ���������û�ǰ����֤������Ϣ
	 function disabledError(elem){
	 		if(elem.parentNode.getAttribute("errstate")){
					 hideErrors(elem);
	         elem.parentNode.removeAttribute("errstate");
			}
 	}
 	
	function getDateFromFormat(val,format) 
	 {
	 	if(val=="") return 1;
		val=val+"";
		format=format+"";
		var i_val=0;
		var i_format=0;
		var c="";
		var token="";
		var token2="";
		var x,y;
		var now=new Date();
		var year=now.getYear();
		var month=now.getMonth()+1;
		var date=1;
		var hh=now.getHours();
		var mm=now.getMinutes();
		var ss=now.getSeconds();
	 
		while (i_format < format.length) 
		{
			// Get next token from format string
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
				}
			// Extract contents of value based on format token
			if (token=="yyyy" ) 
			{
				 x=4;y=4; 
				 year=getInt(val,i_val,x,y);
				 if (year==null) { return 0; }
				 i_val += year.length;
				 
			}
			else if (token=="MM") 
			{
				month=getInt(val,i_val,token.length,2);
				if(month==null||(month<1)||(month>12)){return 0;}
				i_val+=month.length;
			}
			else if (token=="dd") 
			{
				date=getInt(val,i_val,token.length,2);
				if(date==null||(date<1)||(date>31)){return 0;}
				i_val+=date.length;
			}
	 
			else if (token=="HH")
			{
				hh=getInt(val,i_val,token.length,2);
				if(hh==null||(hh<0)||(hh>23)){return 0;}
				i_val+=hh.length;
			}
			else if (token=="mm") 
			{
				mm=getInt(val,i_val,token.length,2);
				if(mm==null||(mm<0)||(mm>59)){return 0;}
				i_val+=mm.length;
			}
			else if (token=="ss") 
			{
				ss=getInt(val,i_val,token.length,2);
				if(ss==null||(ss<0)||(ss>59)){return 0;}
				i_val+=ss.length;
			}
		 
			else 
			{
				if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
				else {i_val+=token.length;}
			}
		}//while end
		// If there are any trailing characters left in the value, it doesn't match
		if (i_val != val.length) { return 0; }
		// Is date valid for month?
		if (month==2) 
		{
			// Check for leap year
			if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) 
			{ // leap year
				if (date > 29){ return 0; }
			}
			else { if (date > 28) { return 0; } }
		}
		if ((month==4)||(month==6)||(month==9)||(month==11)) 
		{
			if (date > 30) { return 0; }
		}
	 
		var newdate=new Date(year,month-1,date,hh,mm,ss);
		return newdate.getTime();
	}
	function getInt(str,i,minlength,maxlength)
	{
		for (var x=maxlength; x>=minlength; x--) {
			var token=str.substring(i,i+x);
			if (token.length < minlength) { return null; }
			if (isInteger(token)) { return token; }
			}
		return null;
	}
	function isInteger(val)
	{
		var digits="1234567890";
		for (var i=0; i < val.length; i++) {
			if (digits.indexOf(val.charAt(i))==-1)
			{ return false; }
		}
		return true;
	}
	
	function checkAllHiddenIgnore(form){
	    for (var i = 0; i < form.elements.length; i++) {
	    	var v_element=form.elements[i];
		 	if(form.elements[i].disabled==false)
		 	{
				 validateField(form.elements[i]);
			}
	    }
	    if($(".validatebox-invalid")[0]){
		    //$(".validatebox-invalid")[0].focus();
		    return false;
	    }else{
	        return true;
	    }
	}
	function checkSubmitHiddenIgnore(form_01){
		if(form_01){
	       if(typeof form_01 == 'string'){
	         form_01 = document.getElementsByName(form_01)[0];
	       }
	       return checkAllHiddenIgnore(form_01);
	    }else{
	    	return checkSubmit();
	    }
	}