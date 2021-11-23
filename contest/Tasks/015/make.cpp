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
char Name_file[] = "015";
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

const int N = 110;

int n, m;
int a[N];

void make_test( int test)
{
  n = random(100) + 1, m = random(100) + 1;
  fi << n << " " << m << endl;
  for (int i = 1; i <= n; i++) {
    a[i] = random(100) + 1;
    fi << a[i] << " ";
    a[i] += random(100) + 1;
    fi << a[i] << endl;
  }
  for (int i = 1; i <= m; i++) {
    int op = random(2) + 1;
    int x = random(n) + 1;
    fi << op << " " << x << " ";
    if (op == 1) {
      fi << random(100) + 1;
    } else {
      fi << random(a[x]) + 1;
    }
    fi << endl;
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
    FOR(test,1, 20)
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
