package com.anterp.modules;

public class Pagers {

	public static int getOffset(int requestPageNumber, int rowsPerPage) {
		return (requestPageNumber - 1) * rowsPerPage;
	}

	public static int getTotalPage(int totalRows, int rowsPerPage) {
		int totalPage = totalRows / rowsPerPage;
		if ((totalRows % rowsPerPage) == 0) {
			return totalPage;
		}
		return totalPage + 1;
	}
}
