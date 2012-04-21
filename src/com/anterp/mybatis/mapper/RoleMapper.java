package com.anterp.mybatis.mapper;

import com.anterp.mybatis.domain.Role;
import com.anterp.mybatis.domain.RoleExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RoleMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int countByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int deleteByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int deleteByPrimaryKey(Integer roleid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int insert(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int insertSelective(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    List<Role> selectByExample(RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    Role selectByPrimaryKey(Integer roleid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByExampleSelective(@Param("record") Role record, @Param("example") RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByExample(@Param("record") Role record, @Param("example") RoleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByPrimaryKeySelective(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByPrimaryKey(Role record);
}