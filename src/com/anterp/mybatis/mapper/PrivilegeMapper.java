package com.anterp.mybatis.mapper;

import com.anterp.mybatis.domain.Privilege;
import com.anterp.mybatis.domain.PrivilegeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PrivilegeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int countByExample(PrivilegeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int deleteByExample(PrivilegeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int insert(Privilege record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int insertSelective(Privilege record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    List<Privilege> selectByExample(PrivilegeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByExampleSelective(@Param("record") Privilege record, @Param("example") PrivilegeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tbl_role_pvg
     *
     * @mbggenerated Sat Apr 21 15:40:10 CST 2012
     */
    int updateByExample(@Param("record") Privilege record, @Param("example") PrivilegeExample example);
}