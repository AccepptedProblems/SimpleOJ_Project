//Dai Ca Di Hoc
#include <iostream>
#include <cstdlib>
#include <cmath>
#include <iomanip>
#include <cstring>
#include <fstream>
#include <algorithm>
#include <queue>
#include <utility>
#include <vector>
#include <windows.h>
#include <direct.h>
#define FOR(i,a,b) for(int i = (a); i <= (b); i++)
#define FORD(i,a,b) for(int i = (a); i >= (b); i--)
#define maxn 1003
#define maxc 1000000003


using namespace std;

ofstream fi;
char Name_file[] = "011";
char exe_file[100] = "";
char inp_file[100] = "";
char out_file[100] = "";
string folder = "Test00";

long long random(long long x)
{
  long long res = rand();
  res = (res << 16) + rand();
  res = (res << 16) + rand();
  return res % x;
}

const int N = 100010;

int n;
int a[N];

void make_test( int test)
{
  if (test <= 18) {
    n = random(100) + 1;
  } else {
    n = 100000;
  }
  fi << n << endl;
  for (int i = 1; i <= n; i++) {
    a[i] = i;
  }
  random_shuffle(a + 1, a + n + 1);
  if (random(2)) {
    a[1] = n + 1;
  }
  for (int i = 1; i <= n; i++) {
    fi << a[i] << " ";
  }
}

void run_answer()
{
    system(exe_file);
}

void Rename_file(int test)
{
    folder[4] = test/10 + 48;
    folder[5] = test%10 + 48;
    mkdir(&folder[0]);
    string output_path = folder + "\\" + inp_file;
    CopyFile(inp_file, &output_path[0], false);
    output_path = folder + "\\" + out_file;
    CopyFile(out_file, &output_path[0], false);
}

void Make_file_name()
{
    strcpy(exe_file,Name_file);
    //strcpy(inp_file,Name_file);
    //strcpy(out_file,Name_file);

    strcat(exe_file,".exe");
    strcat(inp_file,"inp.txt");
    strcat(out_file,"out.txt");

}

int main()
{
    Make_file_name();
    FOR(test,1,20)
    {
        cout << test << endl;
        fi.open(inp_file);
        make_test(test);
        fi.close();
        run_answer();
        Rename_file(test);
    }
    DeleteFile(inp_file);
    DeleteFile(out_file);
    return 0;
}
